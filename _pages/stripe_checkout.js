var stripe = Stripe('pk_test_51OmfAYE2UvP4xcDs92nWGG93clovJ2N6OBjuvPv9k26lrUnU0VDdS4ra32km006KbVhlHGygobi4SQpTbpBTeyGa00FwesDfwo');

console.log('Redirigiendo a Stripe Checkout...');

stripe.redirectToCheckout({
  sessionId: 'id_de_la_sesion_de_pago',
  successUrl: 'pago-exitoso.html',
  cancelUrl: 'pago-cancelado.html',
}).then(function (result) {
  // Manejar errores, si los hay
});