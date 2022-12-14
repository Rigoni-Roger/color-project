import React from "react";
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from '@material-ui/icons/Delete';
import sizes from "./sizes";
import chroma from 'chroma-js';


const styles = {
    root: {
        height: "25%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.3)"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%",
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%",
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%",
        },
    },
    boxContent: {
        color: props =>
            chroma(props.color).luminance() <= 0.08 ? "white" : "black",
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out",
    }
}

const DraggableColorBox = SortableElement((props) => {
    const { classes, handleClick, name, color } = props;
    return <div
        className={classes.root}
        style={{ backgroundColor: color }}
    >
        <div className={classes.boxContent}>
            <span>{name}</span>
            <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
        </div>
    </div>
})

export default withStyles(styles)(DraggableColorBox);