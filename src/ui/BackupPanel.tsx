import { useRef, useState } from 'react';
import {
  applyBackup,
  backupFilename,
  BackupError,
  buildBackup,
  countsOf,
  parseBackup,
  recordExport,
  serialiseBackup,
  type Backup,
  type BackupCounts,
  type ImportMode,
} from '@/data/backup';
import { Sparkle } from '@/ui/art';

interface Props {
  /** Null means never backed up. */
  lastExportAt: number | null;
  hasProgress: boolean;
  onChanged: () => void;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'staged'; backup: Backup; counts: BackupCounts }
  | { kind: 'error'; message: string }
  | { kind: 'done'; message: string };

function daysAgo(then: number, now: number): number {
  return Math.floor((now - then) / 86_400_000);
}

function describeAge(lastExportAt: number | null): string {
  if (lastExportAt === null) return 'You have never made a backup.';
  const days = daysAgo(lastExportAt, Date.now());
  if (days === 0) return 'You backed up today.';
  if (days === 1) return 'Last backup: yesterday.';
  return `Last backup: ${days} days ago.`;
}

export default function BackupPanel({
  lastExportAt,
  hasProgress,
  onChanged,
}: Props) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const fileRef = useRef<HTMLInputElement>(null);

  const stale = lastExportAt === null || daysAgo(lastExportAt, Date.now()) >= 7;

  const handleExport = async () => {
    const now = Date.now();
    const text = serialiseBackup(await buildBackup(now));
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = backupFilename(now);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    await recordExport(now);
    onChanged();
    setStatus({
      kind: 'done',
      message: `Saved ${backupFilename(now)} to your downloads. Put it somewhere that isn't this device.`,
    });
  };

  const handleFile = async (file: File) => {
    try {
      const backup = parseBackup(await file.text());
      setStatus({ kind: 'staged', backup, counts: countsOf(backup) });
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof BackupError
            ? error.message
            : 'That file could not be read, so nothing was changed.',
      });
    }
  };

  const handleRestore = async (mode: ImportMode) => {
    if (status.kind !== 'staged') return;
    const counts = await applyBackup(status.backup, mode);
    onChanged();
    setStatus({
      kind: 'done',
      message:
        mode === 'replace'
          ? `Replaced everything on this device: ${counts.cards} scheduled questions, ${counts.attempts} answers, ${counts.habitEntries} habit days.`
          : `Merged in ${counts.cards} scheduled questions and ${counts.attempts} answers, keeping whichever copy of each was newer.`,
    });
  };

  return (
    <section className="backup">
      <header className="card">
        <h2>
          <Sparkle /> Backup
        </h2>
        <p className="score-sub">
          Everything you&rsquo;ve done lives on this device only. A phone reset
          or clearing website data would wipe it, and there is no sync yet — so
          a file you keep elsewhere is the safety net.
        </p>
        {hasProgress && (
          <p className={stale ? 'unverified' : 'score-sub'}>
            {describeAge(lastExportAt)}
            {stale && ' Worth doing now.'}
          </p>
        )}
        <button type="button" className="primary big" onClick={() => void handleExport()}>
          <Sparkle /> Export a backup file
        </button>
        <p className="nudge">
          Saves one <code>.json</code> file. Email it to yourself, or drop it in
          OneDrive — anywhere that isn&rsquo;t this device.
        </p>
      </header>

      <section className="card">
        <h3>Restore from a backup</h3>
        <p className="score-sub">
          Pick a file you exported earlier. Nothing changes until you confirm.
        </p>

        <input
          ref={fileRef}
          id="backup-file"
          type="file"
          accept="application/json,.json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = '';
          }}
        />
        <label htmlFor="backup-file">Choose a backup file</label>

        {status.kind === 'error' && (
          <p className="verdict wrong" role="alert">
            {status.message}
          </p>
        )}

        {status.kind === 'done' && (
          <p className="verdict right" role="status">
            {status.message}
          </p>
        )}

        {status.kind === 'staged' && (
          <div className="pop restore-confirm">
            <p className="verdict close">
              Backup read successfully — from{' '}
              {new Date(status.backup.exportedAt).toLocaleDateString()}. Nothing
              has changed yet.
            </p>
            <ul className="tag-list">
              <li className="tag">
                Scheduled questions
                <span className="tag-n">{status.counts.cards}</span>
              </li>
              <li className="tag">
                Answers
                <span className="tag-n">{status.counts.attempts}</span>
              </li>
              <li className="tag">
                Study days
                <span className="tag-n">{status.counts.days}</span>
              </li>
              <li className="tag">
                Habit days
                <span className="tag-n">{status.counts.habitEntries}</span>
              </li>
            </ul>
            <div className="restore-actions">
              <button
                type="button"
                className="primary"
                onClick={() => void handleRestore('merge')}
              >
                Merge with what&rsquo;s here
              </button>
              <button
                type="button"
                className="danger"
                onClick={() => void handleRestore('replace')}
              >
                Replace everything
              </button>
              <button
                type="button"
                className="quiet"
                onClick={() => setStatus({ kind: 'idle' })}
              >
                Cancel
              </button>
            </div>
            <p className="nudge">
              <strong>Merge</strong> keeps whichever copy of each record is
              newer — right for pulling in another device.{' '}
              <strong>Replace</strong> throws away what is on this device — right
              for restoring after a wipe.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
