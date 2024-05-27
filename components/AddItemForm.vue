<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props: activator }">
      <v-btn icon v-bind="activator">
        <v-icon>mdi-account-edit-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="addItem">
          <v-row>
            <v-col cols="10">
              <v-text-field :label="inputPlaceholder" v-model="newItem" required></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="addItem">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <ul class="items-list">
            <li v-for="(item, index) in items" :key="index" class="items-list-item">
              <span>{{ item }}</span>
              <v-btn icon @click="removeItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </li>
          </ul>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
        <v-btn color="blue darken-1" text @click="saveItems">Enregistrer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['save']);

const dialog = ref(false);
const newItem = ref('');
const items = ref<string[]>(props.items);

const addItem = () => {
  if (newItem.value.trim()) {
    items.value.push(newItem.value.trim());
    newItem.value = '';
  }
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};

const saveItems = () => {
  emit('save', items.value);
  dialog.value = false;
};
</script>

<style scoped>
.v-col.align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.items-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.items-list-item span {
  flex-grow: 1;
}

.items-list-item v-btn {
  margin-left: 8px;
}
</style>