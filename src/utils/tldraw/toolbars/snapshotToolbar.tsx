import { useCallback, ReactNode } from 'react';
import { useEditor, getSnapshot, loadSnapshot, TLStoreSnapshot, useToasts } from 'tldraw';
import axios from '../../../axiosConfig';
import blankCanvasSnapshotData from './blankCanvasSnapshot.json';

export function SnapshotToolbar({ pathFromCalendar, children }: { pathFromCalendar: string | null, children: (props: { save: () => void, resetToBlankCanvas: () => void }) => ReactNode }) {
    const editor = useEditor();
    const { addToast } = useToasts();

    const save = useCallback(() => {
        const snapshot = getSnapshot(editor.store);
        localStorage.setItem('snapshot', JSON.stringify(snapshot));
        const { document, session } = snapshot;

        const multiplayerHomePath = import.meta.env.VITE_MULTIPLAYERHOMEPATH
        const multiplayerHomeFilePath = multiplayerHomePath.replace(/\\/g, '/') + '/tldraw_home.json';
        axios.post(`/api/database/tldraw_fs/set_tldraw_user_file${multiplayerHomeFilePath}`, { document, session })
            .then(() => {
                console.log('Snapshot saved successfully');
                addToast({
                    title: 'Snapshot saved',
                    description: 'Your snapshot has been saved successfully.',
                    icon: 'check',
                });
            })
            .catch((error) => {
                console.error('Failed to save snapshot:', error);
                addToast({
                    title: 'Error',
                    description: 'Failed to save snapshot. Please try again.',
                    icon: 'warning-triangle',
                });
            });
    }, [editor, pathFromCalendar, addToast]);

    const resetToBlankCanvas = useCallback(() => {
        const blankSnapshot: TLStoreSnapshot = blankCanvasSnapshotData as TLStoreSnapshot;

        loadSnapshot(editor.store, blankSnapshot);
        addToast({
            title: 'Canvas reset',
            description: 'The canvas has been reset to blank.',
            icon: 'reset-zoom',
        });
    }, [editor, addToast]);

    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {children({ save, resetToBlankCanvas })}
        </div>
    );
}
