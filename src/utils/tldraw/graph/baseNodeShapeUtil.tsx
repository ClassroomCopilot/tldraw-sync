import {
    Editor,
    HTMLContainer,
    Rectangle2d,
    ShapeUtil,
    TLDefaultColorTheme,
    getDefaultColorTheme,
    createShapeId
} from 'tldraw'
import {
    AllNodeShapes
} from './graph-shape-types'
import {
    AllRelationshipShapes
} from './graph-relationship-types'
import { getNodeComponent } from './nodeComponents';
import axios from '../../../axiosConfig';
import graphState from './graphStateUtil';

export const nodeTypeConfig = {
    Developer: { shapeType: 'developer_node', color: 'light-blue' },
    Teacher: { shapeType: 'teacher_node', color: 'light-green' },
    
    User: { shapeType: 'user_node', color: 'light-green' },
    TeacherTimetable: { shapeType: 'teacher_timetable_node', color: 'blue' },
    TimetableLesson: { shapeType: 'timetable_lesson_node', color: 'light-blue' },
    PlannedLesson: { shapeType: 'planned_lesson_node', color: 'light-green' },
    School: { shapeType: 'school_node', color: 'grey' },
    Calendar: { shapeType: 'calendar_node', color: 'violet' },
    CalendarYear: { shapeType: 'calendar_year_node', color: 'red' },
    CalendarMonth: { shapeType: 'calendar_month_node', color: 'light-violet' },
    CalendarWeek: { shapeType: 'calendar_week_node', color: 'light-red' },
    CalendarDay: { shapeType: 'calendar_day_node', color: 'light-blue' },
    CalendarTimeChunk: { shapeType: 'calendar_time_chunk_node', color: 'blue' },
    ScienceLab: { shapeType: 'science_lab_node', color: 'yellow' },
    KeyStageSyllabus: { shapeType: 'key_stage_syllabus_node', color: 'grey' },
    YearGroupSyllabus: { shapeType: 'year_group_syllabus_node', color: 'light-blue' },
    CurriculumStructure: { shapeType: 'curriculum_structure_node', color: 'grey' },
    Topic: { shapeType: 'topic_node', color: 'green' },
    TopicLesson: { shapeType: 'topic_lesson_node', color: 'light-green' },
    LearningStatement: { shapeType: 'learning_statement_node', color: 'light-blue' },
    SchoolTimetable: { shapeType: 'school_timetable_node', color: 'grey' },
    AcademicYear: { shapeType: 'academic_year_node', color: 'light-violet' },
    AcademicTerm: { shapeType: 'academic_term_node', color: 'yellow' },
    AcademicWeek: { shapeType: 'academic_week_node', color: 'orange' },
    AcademicDay: { shapeType: 'academic_day_node', color: 'light-red' },
    AcademicPeriod: { shapeType: 'academic_period_node', color: 'light-green' },
    RegistrationPeriod: { shapeType: 'registration_period_node', color: 'light-green' },
    PastoralStructure: { shapeType: 'pastoral_structure_node', color: 'grey' },
    KeyStage: { shapeType: 'key_stage_node', color: 'blue' },
    Department: { shapeType: 'department_node', color: 'light-blue' },
    Room: { shapeType: 'room_node', color: 'violet' },
    SubjectClass: { shapeType: 'subject_class_node', color: 'light-blue' },
};

const createNodeComponent = (shape: AllNodeShapes, theme: TLDefaultColorTheme, editor: Editor) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const borderColor = theme.id === 'dark' ? 'white' : 'black'

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Define button areas
        const openFileButtonArea = { x: 10, y: shape.props.h - 60, width: shape.props.w - 20, height: 25 }
        const getConnectedNodesButtonArea = { x: 10, y: shape.props.h - 30, width: shape.props.w - 20, height: 25 }

        if (isPointInRect(x, y, openFileButtonArea)) {
            console.log('Clicked on Open File button')
            loadTldrawFile(shape.props.path, editor)
        } else if (isPointInRect(x, y, getConnectedNodesButtonArea)) {
            console.log('Clicked on Get Connected Nodes button')
            handleGetConnectedNodes()
        } else if (isPointInShape(x, y, shape) && !isPointInRect(x, y, openFileButtonArea) && !isPointInRect(x, y, getConnectedNodesButtonArea)) {
            console.log('Clicked on shape')
            isDragging = true;
            startX = e.clientX - shape.x;
            startY = e.clientY - shape.y;
        }
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging) {
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            editor.updateShape({
                id: shape.id,
                type: shape.type,
                x: newX,
                y: newY,
            });
        }
    }

    const handlePointerUp = (e: React.PointerEvent) => {
        isDragging = false;
    }

    const isPointInShape = (x: number, y: number, shape: AllNodeShapes) => {
        const bounds = editor.getShapeGeometry(shape).bounds
        return x >= bounds.x && x <= bounds.x + bounds.width && y >= bounds.y && y <= bounds.y + bounds.height
    }

    const isPointInRect = (x: number, y: number, rect: { x: number, y: number, width: number, height: number }) => {
        return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height
    }

    let isFetchingConnectedNodes = false;

    const handleGetConnectedNodes = async () => {
        if (isFetchingConnectedNodes) {
            console.log("WARNING! Already fetching connected nodes. Skipping...");
            return;
        }
        isFetchingConnectedNodes = true;
    
        console.log("Getting connected nodes for:", shape.props.unique_id);
        try {
            const response = await axios.get(`/api/database/tools/get-connected-nodes-and-edges?unique_id=${shape.props.unique_id}`);
            console.log("Connected nodes response:", response.data);
            if (response.data.status === "success") {
                const mainNode = response.data.main_node;
                const connectedNodes = response.data.connected_nodes;
                const relationships = response.data.relationships;

                // Add nodes to the graph
                [mainNode, ...connectedNodes].forEach((node: any) => {
                    console.log("Node:", node);
                    const newShapeId = createShapeId(node.node_data.unique_id);
                    const doesShapeExist = editor.getShape(newShapeId);
                    if (!doesShapeExist) {
                        console.log("Creating new shape with ID:", newShapeId);
                        const nodeConfig = nodeTypeConfig[node.node_type as keyof typeof nodeTypeConfig];
                        if (nodeConfig) {
                            const newShape = {
                                id: newShapeId,
                                type: nodeConfig.shapeType,
                                x: 0,
                                y: 0,
                                props: {
                                    color: nodeConfig.color,
                                    ...node.node_data
                                }
                            };
                            console.log("New shape:", newShape);
                            console.log("Creating shape:", newShape);
                            editor.createShape(newShape);
                            console.log("New shape created:", newShape);
                            const bounds = editor.getShapeGeometry(newShapeId).bounds;
                            console.log("Shape bounds:", bounds);
                            console.log("Updating shape with width:", bounds.w, "and height:", bounds.h);
                            newShape.props.w = bounds.w;
                            newShape.props.h = bounds.h;
                            console.log("Adding node to graphState:", newShape);
                            const shapeWithWidthAndHeight = {
                                ...newShape,
                                w: bounds.w,
                                h: bounds.h
                            }
                            graphState.addNode(shapeWithWidthAndHeight);
                            console.log("Node added to graphState:", newShape);
                        } else {
                            console.log("WARNING! Node type not found:", node.node_type);
                        }
                    }
                });
                console.log("Updating shapes with dagre...");
                graphState.setEditor(editor);
                graphState.updateShapesWithDagre();

                // Add edges to the graph
                relationships.forEach((relationship: any) => {
                    graphState.addEdge(relationship.start_node.unique_id, relationship.end_node.unique_id);
                });

                // Create edge shapes
                graphState.getEdges().forEach((edge: any) => {
                    console.log("WARNING! Cancelling createEdgeComponent()...");
                    // console.log("handleGetConnectedNodes(): Creating edge component for:", edge.v, edge.w);
                    // createEdgeComponent(edge.v, edge.w, editor);
                });

                console.log("Done!");
            } else {
                console.error('Error in response:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching connected nodes:', error);
        } finally {
            isFetchingConnectedNodes = false;
        }
    };

    const loadTldrawFile = async (path: string, editor: any) => {
        console.log("Loading tldraw_file...")
        try {
            const response = await axios.get(`/api/database/tldraw_fs/get_tldraw_user_file${path}/tldraw_file.json`);
            const fileContent = response.data;
            
            console.log("File content:", fileContent);
    
            if (fileContent && fileContent.document && fileContent.document.store) {
    
                // Ensure the schema version is set
                if (!fileContent.document.schema) {
                    console.log("!fileContent.document.schema")
                    fileContent.document.schema = { schemaVersion: 1 };
                } else if (!fileContent.document.schema.schemaVersion) {
                    console.log("!fileContent.document.schema.schemaVersion")
                    fileContent.document.schema.schemaVersion = 1;
                }
    
                // Load the new content
                console.log("Loading snapshot: ", fileContent)
                editor.loadSnapshot(fileContent);
            } else {
                console.error('Invalid file content structure:', fileContent);
                throw new Error('Invalid file content structure');
            }
        } catch (error) {
            console.error('Error loading tldraw file:', error);
        }
    };

    return (
        <HTMLContainer
            id={shape.id}
            style={{
                border: `1px solid ${borderColor}`,
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                pointerEvents: 'all',
                backgroundColor: theme[shape.props.color].semi,
                color: theme[shape.props.color].solid,
                boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                padding: '10px',
                height: shape.props.h,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {getNodeComponent(shape, theme)}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '10px' }}>
                <div
                    style={{
                        backgroundColor: theme[shape.props.color].solid,
                        color: theme[shape.props.color].semi,
                        padding: '5px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginBottom: '5px',
                        textAlign: 'center',
                    }}
                    onClick={() => loadTldrawFile(shape.props.path, editor)}
                >
                    Open File
                </div>
                <div
                    style={{
                        backgroundColor: theme[shape.props.color].solid,
                        color: theme[shape.props.color].semi,
                        padding: '5px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                    onClick={handleGetConnectedNodes}
                >
                    Get Connected Nodes
                </div>
            </div>
        </HTMLContainer>
    )
}

const createNodeIndicator = (shape: AllNodeShapes, editor: any) => {
    const bounds = editor.getShapeGeometry(shape).bounds
    const theme = getDefaultColorTheme({ isDarkMode: editor.user.getIsDarkMode() })
        return (
            <rect
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
                fill="none"
                stroke={theme[shape.props.color].solid}
                strokeWidth={2}
                rx={5}
                ry={5}
            />
        )
}

const createEdgeComponent = (sourceId: string, targetId: string, editor: any) => {
    console.log("Creating edge component for:", sourceId, targetId)
    const edge = {
        type: 'general_relationship',
        props: {
            w: 200,
            h: 300,
            color: 'black',
            __relationshiptype__: '',
            source: sourceId,
            target: targetId,
        }
    };
    editor.createShape(edge);
    graphState.addNode(edge);
};

export abstract class BaseNodeShapeUtil<T extends AllNodeShapes> extends ShapeUtil<T> {
    static override type: string

    static override props: any
    static override migrations: any

    override isAspectRatioLocked = (_shape: T) => true
    override canResize = (_shape: T) => true

    abstract override getDefaultProps(): T['props']

    getGeometry(shape: T) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            x: 0,
            y: 0,
            isFilled: true,
        })
    }

    component(shape: T) {
        const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })
        return createNodeComponent(shape, theme, this.editor)
    }

    indicator(shape: T) {
        return createNodeIndicator(shape, this.editor)
    }

    onDrag = (shape: T, dx: number, dy: number) => {
        return {
            x: shape.x + dx,
            y: shape.y + dy,
        }
    }
}

export abstract class BaseRelationshipShapeUtil<T extends AllRelationshipShapes> extends ShapeUtil<T> {
    static override type: string

    static override props: any
    static override migrations: any

    override isAspectRatioLocked = (_shape: T) => true
    override canResize = (_shape: T) => true

    abstract override getDefaultProps(): T['props']

    getGeometry(shape: T) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            x: 0,
            y: 0,
            isFilled: true,
        });
    }

    component(shape: T) {
        // Define how the edge is rendered
        return (
            <line
                x1={shape.x}
                y1={shape.y}
                x2={shape.x}
                y2={shape.y}
                stroke={shape.props.color}
                strokeWidth={2}
            />
        );
    }

    indicator(shape: T) {
        // Define the indicator for the edge
        return (
            <line
                x1={shape.x}
                y1={shape.y}
                x2={shape.x}
                y2={shape.y}
                stroke={shape.props.color}
                strokeWidth={2}
                strokeDasharray="4 2"
            />
        );
    }
}