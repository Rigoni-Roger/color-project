import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import sizes from "./sizes";


const drawerWidth = 400;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    navBtns: {
        marginRight: "1rem",
        [sizes.down("xs")]: {
            marginRight: "0.5rem",
        }
    },
    button: {
        margin: "0 0.5rem",
        [sizes.down("xs")]: {
            margin: "0 0.2rem",
            padding: "0.2rem"
        }
    },
    link: {
        textDecoration: "none"
    }
})
class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { newPaletteName: "", formShowing: false };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);

    };
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };
    showForm() {
        this.setState({ formShowing: true })
    }
    hideForm() {
        this.setState({ formShowing: false })
    }
    render() {
        const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
        const { formShowing } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link className={classes.link} to="/">
                            <Button className={classes.button} variant="contained" color="secondary">Go Back</Button>
                        </Link>
                        <Button className={classes.button} variant="contained" color="primary" onClick={this.showForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {formShowing && (
                    <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />
                )}

            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);