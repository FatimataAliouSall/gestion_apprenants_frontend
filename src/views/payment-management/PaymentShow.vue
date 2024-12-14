<template>
    <div class="payment-details mt-4">
      <h2 class="title">Détails du Paiement</h2>
      <div v-if="payment" class="details-card p-3">
        <p><strong>Payeur:</strong> {{ payment.name }}</p>
        <p><strong>Montant:</strong> {{ payment.amount }} MRU</p>
        <p><strong>Mode de Paiement:</strong> {{ payment.method }}</p>
      </div>
      <div v-else>
        <p class="text-danger">Paiement introuvable.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { storePayment } from "@/stores/storePayment";
  
  const route = useRoute();
  const store = storePayment();
  const payment = ref(null);
  
  onMounted(() => {
    const paymentId = route.params.id;
    payment.value = store.getPaymentById(paymentId);
  });
  </script>
  
  <style scoped>
  .payment-details {
    max-width: 600px;
    margin: auto;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #218838;
  }
  
  .details-card {
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  strong {
    font-weight: bold;
  }
  </style>
  