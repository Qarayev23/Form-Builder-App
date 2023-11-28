import { DraggingStyle, NotDraggingStyle, DraggableStateSnapshot } from "react-beautiful-dnd";

export const getStyle = (style: DraggingStyle | NotDraggingStyle | undefined, snapshot: DraggableStateSnapshot, width?: number) => {
    if (snapshot.isDragging && snapshot.draggingOver === "Editor" && width){
        return { ...style, width: `${width}px` };
    } 

    if (!snapshot.isDropAnimating) return style;

    return { ...style, transitionDuration: `0.001s` };
}