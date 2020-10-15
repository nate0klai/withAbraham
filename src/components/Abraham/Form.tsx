import React, { useState } from "react";
import { Box, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@material-ui/core";
import { PayingTypePage, MROTLabel } from "./components";
import { Field, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from "react-redux";

type PayingTypes = 'month' | 'day' | 'hour';

type ITaxDisabled = {
    [key in PayingTypes]: boolean
}

interface radioButtonProps {
    input: {value: string}
}

const radioButton: React.FC<radioButtonProps> = ({ input, ...rest }) => {
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="payingType" name="payingType"  {...input} {...rest}>
                <FormControlLabel value="month" control={<Radio />} label="Оклад за месяц" />
                <FormControlLabel value="mrot" control={<Radio />} label={<MROTLabel />} />
                <FormControlLabel value="day" control={<Radio />} label="Оплата за день" />
                <FormControlLabel value="hour" control={<Radio />} label="Оплата за час" />
            </RadioGroup>
        </FormControl>
    )
}

interface InitialValues {
    payingType: PayingTypes | 'mrot',
    payingAmount?: string,
    taxDisabled?: boolean
}

const Form: React.FC<InitialValues & InjectedFormProps<{}, InitialValues>> = ({payingType}) => {
    const [taxDisabled, setTaxDisabled] = useState<ITaxDisabled>({month: true, day: true, hour: true});
    const changeTaxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaxDisabled(prev => ({...prev, [payingType]: (event.target as HTMLInputElement).checked}));
    }

    return (
        <Box>
            <FormLabel component="legend">Сумма</FormLabel>
            <Box mt={2} px={2}>
                <Field name="payingType" component={radioButton} value={payingType} />
                {payingType === 'month' && (
                    <PayingTypePage name="month" active={taxDisabled[payingType]} changeHandler={changeTaxHandler}/>
                )}
                {payingType === 'day' && (
                    <PayingTypePage name="day" active={taxDisabled[payingType]} changeHandler={changeTaxHandler}/>
                )}
                {payingType === 'hour' && (
                    <PayingTypePage name="hour" active={taxDisabled[payingType]} changeHandler={changeTaxHandler}/>
                )}
            </Box>
        </Box>
    )
}

const reduxFormComponent = reduxForm<{}, InitialValues>({
    form: 'payingForm',
    initialValues: {
        payingType: 'month',
        payingAmount: '',
        taxDisabled: true
    }
})(Form);

const selector = formValueSelector('payingForm')
export default connect(
    state => ({payingType: selector(state, 'payingType')})
)(reduxFormComponent);