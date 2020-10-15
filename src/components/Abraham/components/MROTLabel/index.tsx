import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Box, IconButton, Tooltip, Typography} from "@material-ui/core";
import CloseIcon from "./close.png";
import InfoIcon from "./info.svg";

const mrotLabelStyles = makeStyles({
    root: {
        '& .button': {
            minWidth: 0
        },
        '& .MuiTooltip-tooltip': {
            width: 250,
            margin: 0,
            padding: '0 18px',
            backgroundColor: 'transparent',
            '& .tooltip-arrow': {
                borderStyle: 'solid',
                borderWidth: '20px 0 0 10px',
                borderColor: 'transparent transparent transparent #115293'
            },
            '& .tooltip-content': {
                backgroundColor: '#115293',
                color: 'white',
                padding: '10px'
            }
        }
    }
});

export const MROTLabel:React.FC = () => {
    const [openByClick, setOpenByClick] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const styles = mrotLabelStyles();

    const tooltipToggleHandler = () => {
        setOpenByClick(!openByClick);
    };
    const handleClose = () => {
        !openByClick && setOpen(false);
    };
    const handleOpen = () => {
        !openByClick && setOpen(true);
    };

    return (
        <Box display="flex" alignItems="center">
            <Box component="span" mr={2}>МРОТ</Box>
            <Box className={styles.root}>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    disableFocusListener
                    disableHoverListener={openByClick}
                    disableTouchListener
                    placement="bottom-start"
                    onClose={handleClose}
                    onOpen={handleOpen}
                    title={
                        <React.Fragment>
                            <Box className="tooltip">
                                <Box className="tooltip-arrow"/>
                                <Box className="tooltip-content">
                                    <Typography>МРОТ - минимальный размер оплаты труда. Разный для разных регионов.</Typography>
                                </Box>
                            </Box>
                        </React.Fragment>
                    }
                    open={openByClick || open}
                >
                    <IconButton aria-label="delete" onClick={tooltipToggleHandler} className="button" disableRipple>
                        {openByClick ? (
                            <img src={CloseIcon} width={20} alt="" />
                        ) : (
                            <img src={InfoIcon} width={20} alt="" />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
};