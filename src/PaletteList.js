import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import sizes from "./sizes";
import bg from "./bg.svg";


const styles = {

    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        overflow: "scroll"

    },
    heading: {
        fontSize: "2rem"
    },
    container: {
        minidth: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "80%"
        },
        [sizes.down("xs")]: {
            width: "75%"
        },
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& a": {
            color: "white",
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 45%)",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 90%)",
            gridGap: "1.5rem"
        },
    }
};
class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: "",
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }
    openDialog(id) {
        this.setState({
            openDeleteDialog: true, deletingId: id
        });
    };
    closeDialog() {
        this.setState({
            openDeleteDialog: false, deletingId: ""
        })
    };
    handleDelete() {
        this.props.deletePalette(this.state.deletingId)
        this.closeDialog();
    }
    goToPalette(id) {
        console.log("Hi!")
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { palettes, classes, deletePalette } = this.props
        const { openDeleteDialog, deletingId } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <MiniPalette {...palette}
                                    goToPalette={this.goToPalette}
                                    // handleDelete={deletePalette}
                                    openDialog={this.openDialog}
                                    key={palette.id}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id="delete-dialog-title">Delete This Palette</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    };
};
export default withStyles(styles)(PaletteList);