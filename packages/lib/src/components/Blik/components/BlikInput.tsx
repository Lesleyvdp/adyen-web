import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import useCoreContext from '../../../core/Context/useCoreContext';
import Field from '../../internal/FormFields/Field';
import getImage from '../../../utils/get-image';
import { renderFormField } from '../../internal/FormFields';
import { UIElementProps } from '../../UIElement';
import './BlikInput.scss';
import useForm from '../../../utils/useForm';

interface BlikInputProps extends UIElementProps {
    data?: BlikInputDataState;
}

interface BlikInputDataState {
    blikCode: string;
}

function BlikInput(props: BlikInputProps) {
    const { i18n, loadingContext } = useCoreContext();
    const { handleChangeFor, triggerValidation, data, valid, errors, isValid } = useForm({
        schema: ['blikCode'],
        rules: {
            blur: {
                blikCode: code => code?.length === 6
            },
            input: {
                blikCode: code => code?.length === 6
            }
        }
    });

    useEffect(() => {
        props.onChange({ data, errors, valid, isValid }, this);
    }, [data, valid, errors, isValid]);

    const [status, setStatus] = useState('ready');
    this.setStatus = setStatus;
    this.showValidation = triggerValidation;

    return (
        <div className="adyen-checkout__blik">
            <p className="adyen-checkout__blik__helper">{i18n.get('blik.help')}</p>
            <Field
                errorMessage={!!errors.blikCode && i18n.get('blik.invalid')}
                label={i18n.get('blik.code')}
                classNameModifiers={['blikCode', '50']}
                isValid={valid.blikCode}
            >
                {renderFormField('text', {
                    value: data.blikCode,
                    name: 'blikCode',
                    spellcheck: false,
                    required: true,
                    autocorrect: 'off',
                    onInput: handleChangeFor('blikCode', 'input'),
                    onChange: handleChangeFor('blikCode', 'blur'),
                    placeholder: '123456',
                    maxLength: 6
                })}
            </Field>

            {props.showPayButton && props.payButton({ status, icon: getImage({ loadingContext, imageFolder: 'components/' })('lock') })}
        </div>
    );
}

BlikInput.defaultProps = { data: { blikCode: '' } };

export default BlikInput;
