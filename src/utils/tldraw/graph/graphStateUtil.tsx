import dagre from '@dagrejs/dagre';
import { createShapeId, Editor } from 'tldraw';

const graphState = {
    g: new dagre.graphlib.Graph(),
    nodeData: new Map<string, any>(),
    editor: null as Editor | null,

    initGraph: () => {
        graphState.g.setGraph({});
        graphState.g.setDefaultEdgeLabel(() => ({}));
    },

    updateNodesWithDagre: () => {
        dagre.layout(graphState.g);
        // Update positions in nodeData after layout
        graphState.g.nodes().forEach((id) => {
            const node = graphState.g.node(id);
            if (graphState.nodeData.has(id)) {
                const fullNode = graphState.nodeData.get(id);
                fullNode.x = node.x;
                fullNode.y = node.y;
                graphState.nodeData.set(id, fullNode);
            }
        });
    },

    updateShapesWithDagre: () => {
        console.log("Updating shapes with dagre...");
        if (!graphState.editor) {
            console.error("Editor is not set. Call setEditor before updating shapes.");
            return;
        }

        console.log("Updating nodes with dagre...");
        graphState.updateNodesWithDagre();
        console.log("Nodes updated with dagre...");

        console.log("Updating set of shapes with dagre...");
        graphState.nodeData.forEach((shape, id) => {
            console.log("Updating shape with dagre:", shape, id);
            const node = graphState.g.node(id);
            console.log("Node without w and h:", node);
            const nodeWithWidthAndHeight = {
                ...node,
                width: shape.w,
                height: shape.h
            }
            console.log("Node with w and h:", nodeWithWidthAndHeight);

            if (nodeWithWidthAndHeight) {
                console.log("Updating shape:", shape);
                
                graphState.editor!.updateShape({
                    id: createShapeId(node.label),
                    type: shape.type,
                    x: nodeWithWidthAndHeight.x - nodeWithWidthAndHeight.width / 2,
                    y: nodeWithWidthAndHeight.y - nodeWithWidthAndHeight.height / 2,
                });
            }
        });
    },

    addNode: (shape: any) => {
        console.log("Adding shape to graphState:", shape);
        const id = shape.props.unique_id;
        console.log("Adding node to graphState:", id);
        graphState.g.setNode(id, { 
            label: id,
            width: shape.props.w, 
            height: shape.props.h
        });
        graphState.nodeData.set(id, shape);
    },

    addEdge: (source: string, target: string) => {
        graphState.g.setEdge(source, target);
    },

    getNode: (id: string) => {
        return graphState.nodeData.get(id);
    },

    getAllNodes: () => {
        return Array.from(graphState.nodeData.values()).filter(item => {
            // Check if the item has a type property and it's not an edge type
            return item.type && !item.type.includes('relationship');
        });
    },

    getEdges: () => {
        return graphState.g.edges();
    },

    setEditor: (editor: Editor) => {
        graphState.editor = editor;
    }
};

graphState.initGraph();

export default graphState;