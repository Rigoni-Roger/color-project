import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import { arrayMoveImmutable } from "array-move";
import PaletteFormNav from './PaletteFormNav';
import seedColors from "./seedColors";

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        height: "100vh"
    },
    drawerPaper: {
        width: drawerWidth,
        display: "flex",
        alignItems: "center"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    container: {
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        width: "100%"
    },
    button: {
        width: "50%"
    }
});
class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: seedColors[0].colors,
        }
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }


    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor(newColor) {

        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
    };
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };
    clearColors() {
        this.setState({ colors: [] });
    };
    addRandomColor() {
        const allColors = this.props.random.map(p => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name);
        }
        this.setState({ colors: [...this.state.colors, randomColor] })
    };
    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }
    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMoveImmutable(colors, oldIndex, newIndex),
        }));
    };

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen} />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button variant="contained" className={classes.button} onClick={this.clearColors} color="secondary">
                                Clear Palette
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={this.addRandomColor}
                                disabled={paletteIsFull}
                                color="primary">
                                Random Color
                            </Button>
                        </div>
                        <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} colors={colors} />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                        distance={20}
                    />
                </main>
            </div>
        );
    }
}

// PersistentDrawerLeft.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(NewPaletteForm);