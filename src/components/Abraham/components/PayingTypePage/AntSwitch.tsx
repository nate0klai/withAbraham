import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

export const AntSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 56,
            height: 32,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 4,
            color: theme.palette.common.white,
            '&$checked': {
                transform: 'translateX(24px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                },
            },
        },
        thumb: {
            width: 24,
            height: 24,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 32 / 2,
            boxSizing: 'border-box',
            opacity: 1,
            backgroundColor: theme.palette.grey[500],
        },
        checked: {},
    }),
)(Switch);