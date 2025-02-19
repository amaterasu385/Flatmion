<template>
    <div class="dashboard">
        <nav class="sidebar">
            <div class="logo">
                <h2>Flatmion</h2>
            </div>
            <ul class="nav-links">
                <li @click="activeSection = 'buildings'" :class="{ active: activeSection === 'buildings' }">
                    <i class="fas fa-building"></i>
                    <span>Buildings</span>
                </li>
                <li @click="activeSection = 'users'" :class="{ active: activeSection === 'users' }">
                    <i class="fas fa-users"></i>
                    <span>Users</span>
                </li>
            </ul>
            <div class="user-info">
                <img src="https://placekitten.com/100/100" alt="User Avatar" class="avatar">
                <span>John Doe</span>
            </div>
        </nav>

        <main class="content">
            <header>
                <h1>{{ activeSection === 'buildings' ? 'Buildings' : 'Users' }}</h1>
                <div class="search-bar">
                    <input type="text" placeholder="Search...">
                    <i class="fas fa-search"></i>
                </div>
            </header>

            <section v-if="activeSection === 'buildings'" class="buildings">
                <div class="card" v-for="building in buildings" :key="building.id">
                    <p class="building-id">ID: {{ building.buildingId }}</p>
                    <h3>{{ building.streetName }}</h3>
                    <p>{{ building.houseNumber }}</p>
                    <p>{{ building.city }}</p>
                </div>
            </section>

            <section v-else-if="activeSection === 'users'" class="users">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.emailAddress }}</td>
                            <td>{{ user.roleId }}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Axios Basis-URL konfigurieren
axios.defaults.baseURL = 'http://localhost:3002';

const activeSection = ref('buildings');
const buildings = ref([]);
const users = ref([]);
const noBuildingsMessage = ref('Keine Gebäude verfügbar.');
const noUsersMessage = ref('Keine Benutzer verfügbar.');
const expandedBuildingId = ref(null);

const fetchBuildings = async () => {
    try {
        const response = await axios.get('/api/buildings');
        buildings.value = response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Gebäude:', error);
        noBuildingsMessage.value = 'Fehler beim Abrufen der Gebäude.';
    }
};

const fetchUsers = async () => {
    try {
        const response = await axios.get('/api/users');
        users.value = response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
        noUsersMessage.value = 'Fehler beim Abrufen der Benutzer.';
    }
};

onMounted(() => {
    fetchBuildings();
    fetchUsers();
});
</script>

<style>
@import '@/assets/adminDashboard.css';
</style>
