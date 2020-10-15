import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Box, Grid, Paper, TextField, Typography } from "@material-ui/core";
import clsx from "clsx";
import { AntSwitch } from "./AntSwitch";
import { numWithLavels } from "../../utils";
import { Field } from 'redux-form';

const paymantInfoStyles = makeStyles({
    root: {
        marginTop: 20,
        padding: '20px 40px',
        '& .cost': {
            fontWeight: 600
        }
    }
});

interface PaymentInfoProps {
    paymentAmount: number,
    taxExcluded: boolean
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({paymentAmount, taxExcluded}) => {
    const styles = paymantInfoStyles();
    const tax = Math.floor(taxExcluded ? paymentAmount * 100 / 87 - paymentAmount : paymentAmount * 0.13);
    return (
        <Paper className={styles.root}>
            <Typography component="div">
                <Grid container spacing={1}>
                    <Grid item className="cost">{numWithLavels(taxExcluded ? paymentAmount : paymentAmount - tax)} &#8381;</Grid>
                    <Grid item>сотрудник будет получать на руки</Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item className="cost">{numWithLavels(tax)} &#8381;</Grid>
                    <Grid item>НДФЛ, 13% от оклада</Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item className="cost">{numWithLavels(taxExcluded ? paymentAmount + tax : paymentAmount)} &#8381;</Grid>
                    <Grid item>за сотрудника в месяц</Grid>
                </Grid>
            </Typography>
        </Paper>
    )
}

interface RenderTextFieldProps {
    input: object
}

const RenderTextField: React.FC<RenderTextFieldProps> = ({
     input,
     ...custom
 }) => (
     <TextField id="standard" variant="outlined" {...input} {...custom} />
 );

interface taxSwitchProps {
    input: object
}

const taxSwitch:React.FC<taxSwitchProps> = ({input, ...custom}) => {
    return (
        <AntSwitch {...input} {...custom} />
    )
}

interface PageProps {
    name: 'month' | 'day' | 'hour',
    active: boolean,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const payingTypePageStyles = makeStyles({
    root: {
        '& .label': {
            '& .label__text': {
                transition: 'color .3s',
                '&.is-on': {
                    color: 'grey'
                },
                '&.is-off': {
                    color: 'black'
                }
            },
            '&.is-active .label__text': {
                '&.is-on': {
                    color: 'black'
                },
                '&.is-off': {
                    color: 'grey'
                }
            },
        },
        '& .input': {
            marginTop: 20,
            '& .MuiTextField-root': {
                '& .MuiInputBase-root': {
                    borderRadius: 28,
                    borderColor: 'grey',
                    '& input': {
                        paddingLeft: 30,
                        paddingRight: 30,
                    },
                    '& fieldset': {
                        borderColor: 'grey',
                    }
                }
            },
            '& .input__label': {
                marginLeft: 10,
                fontSize: '200%'
            }
        },
    }
});

export const PayingTypePage: React.FC<PageProps> = ({name, active, changeHandler}) => {
    const styles = payingTypePageStyles();
    const [paycash, setPaycash] = useState('');
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPaycash(event.target.value.replace(/\D+/g, ''));

    return (
        <>
            <Box px={4} className={styles.root}>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1} className={clsx('label', {'is-active': active})}>
                        <Grid item className="label__text is-off">Указать с НДФЛ</Grid>
                        <Grid item>
                            <Field name="taxDisabled" component={taxSwitch} checked={active} onChange={changeHandler} />
                        </Grid>
                        <Grid item className="label__text is-on">Без НДФЛ</Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={1} className="input">
                        <Grid item>
                            <Field name="payingAmount" component={RenderTextField} onInput={inputHandler} value={paycash} normalize={numWithLavels} />
                        </Grid>
                        <Grid item className="input__label">&#8381;</Grid>
                    </Grid>
                </Typography>
            </Box>
            {name === 'month' && paycash.length > 0 && (
                <PaymentInfo paymentAmount={+paycash} taxExcluded={active} />
            )}
        </>
    )
}