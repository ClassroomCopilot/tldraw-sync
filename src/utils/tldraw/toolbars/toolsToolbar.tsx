import { useEditor, createShapeId } from 'tldraw'
import { useAuth } from '../../userContext';
import graphState from '../graph/graphStateUtil';
import { ReactNode, useEffect } from 'react';

export function ToolsToolbar({ children }: { children: (props: { 
  handlePutUserNode: () => void, 
  handleOpenOneNote: () => void,
  handleAddCalendar: () => void
}) => ReactNode }) {
    const editor = useEditor();
    const { userNode, oneNoteNotebook } = useAuth();

    useEffect(() => {
    }, [oneNoteNotebook]);

    const handlePutUserNode = () => {
        if (!userNode) {
            console.error("User node is not available");
            return;
        }
        const existingNode = graphState.getNode(userNode.unique_id);
        if (!existingNode) {
            console.log("Adding user node to graphState:", userNode);
            const newShapeId = createShapeId(userNode.unique_id);
            const centerX = editor.getViewportScreenCenter().x
            const centerY = editor.getViewportScreenCenter().y
            const newNode = {
                type: 'user_node',
                id: newShapeId,
                x: centerX,
                y: centerY,
                props: {
                    ...userNode
                }
            };
            console.log("Creating user shape:", newNode);
            editor.createShape(newNode);
            console.log("User shape created:", newNode);
            console.log("Getting bounds for user shape:", newShapeId);
            const bounds = editor.getShapeGeometry(newShapeId).bounds;
            console.log("Updating shape with width:", bounds.w, "and height:", bounds.h);
            newNode.props.w = bounds.w;
            newNode.props.h = bounds.h;
            console.log("Adding node to graphState:", newNode);
            const shapeWithWidthAndHeight = {
                ...newNode,
                w: bounds.w,
                h: bounds.h
            }
            graphState.addNode(shapeWithWidthAndHeight);
            graphState.setEditor(editor);
            graphState.updateShapesWithDagre();
        } else {
            console.log(`Node with id ${userNode.unique_id} already exists on the canvas.`);
        }
    };

    const handleOpenOneNote = () => {
        console.log("OneNote Notebook:", oneNoteNotebook);
        if (oneNoteNotebook && oneNoteNotebook.links && oneNoteNotebook.links.oneNoteWebUrl) {
            window.open(oneNoteNotebook.links.oneNoteWebUrl, '_blank');
        } else {
            console.error('OneNote notebook information not available', oneNoteNotebook);
        }
    };

    const handleAddCalendar = () => {
        editor.setCurrentTool('calendar');
    };

    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {children({ handlePutUserNode, handleOpenOneNote, handleAddCalendar })}
        </div>
    );
}
