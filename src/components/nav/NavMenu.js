import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import PublicIcon from '@mui/icons-material/Public'
import {
    Avatar, Drawer, List, ListItem, ListItemIcon,
    ListItemText,
    Tooltip
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useHistory } from 'react-router-dom'

const NavMenu = () => {
    const history = useHistory()
    const identity = useIdentityContext()
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleDrawer = () => {
        console.log(identity.user, identity.provisionalUser)
        setIsOpen(!isOpen)
    }

    const handleNavChoice = (choice, shouldToggle) => {
        history.push(`/${choice}`)
        if (shouldToggle) toggleDrawer()
    }

    const drawerItemList = () => (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem button onClick={() => handleNavChoice('countries', true)}>
                    <ListItemIcon>
                        <PublicIcon />
                    </ListItemIcon>
                    <ListItemText primary="Countries" />
                </ListItem>
            </List>
        </Box>
    )

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: '75px' }}>
                <AppBar position="fixed"
                >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="home button"
                            color="inherit"
                            onClick={() => handleNavChoice('', false)}
                        >
                            <HomeIcon />
                        </IconButton>


                        {!identity.user && !identity.provisionalUser && (
                            <Tooltip title="Signup">
                                <IconButton
                                    color="inherit"
                                    onClick={() => handleNavChoice('signup', false)}
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        {!identity.user && (
                            <Tooltip title="Login">
                                <IconButton
                                    color="inherit"
                                    onClick={() => handleNavChoice('login', false)}
                                >
                                    <LoginIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        {identity.user && (
                            <Tooltip title="Logout">
                                <IconButton color="inherit" onClick={identity.logout}>
                                    <Avatar sx={{ width: 24, height: 24 }}>{identity.user?.user_metadata?.full_name.slice(0, 1)}</Avatar>
                                </IconButton>
                            </Tooltip>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
                {drawerItemList()}
            </Drawer>
        </>
    )
}

export default NavMenu