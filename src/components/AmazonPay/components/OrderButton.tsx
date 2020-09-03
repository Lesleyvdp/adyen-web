import { h } from 'preact';
import useCoreContext from '../../../core/Context/useCoreContext';
import Button from '../../internal/Button';
import { updateAmazonCheckoutSession } from '../utils';

export default function OrderButton(props) {
    const { i18n, loadingContext } = useCoreContext();

    const createOrder = () => {
        const { amount, clientKey, originKey, amazonCheckoutSessionId: checkoutSessionId, returnUrl: checkoutResultReturnUrl } = props;
        const accessKey = clientKey || originKey;

        const data = {
            amount,
            checkoutSessionId,
            checkoutResultReturnUrl
        };

        updateAmazonCheckoutSession(loadingContext, accessKey, data)
            .then(response => {
                if (!response?.action?.type) return console.error('Could not get the AmazonPay URL');
                if (response.action.type === 'redirect') window.location.assign(response.action.url);
            })
            .catch(error => {
                console.error(error);
                if (props.onError) props.onError(error);
            });
    };

    return <Button classNameModifiers={['standalone', 'pay']} label={i18n.get('confirmPurchase')} onClick={createOrder} />;
}
