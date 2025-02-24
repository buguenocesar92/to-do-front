<template>
  <AdminWrapper>
    <HeaderStats />
    <div class="mt-5">
      <div class="flex flex-wrap">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <card-line-chart />
        </div>
        <div class="w-full xl:w-4/12 px-4">
          <card-bar-chart />
        </div>
      </div>
      <div class="flex flex-wrap mt-4">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <card-page-visits />
        </div>
        <div class="w-full xl:w-4/12 px-4">
          <card-social-traffic />
        </div>
      </div>
    </div>
  </AdminWrapper>
</template>

<script setup lang="ts">
import AdminWrapper from '@/components/AdminWrapper.vue';
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
</script>
