<template>
    <div class="dashboard">
        <nav class="sidebar">
            <div class="logo">
                <h2>Our App</h2>
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
                    <img :src="building.image" :alt="building.name">
                    <h3>{{ building.name }}</h3>
                    <p>{{ building.address }}</p>
                </div>
            </section>

            <section v-else-if="activeSection === 'users'" class="users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const activeSection = ref('buildings');

const buildings = [
    { id: 1, name: 'Tower A', address: '123 Main St', image: 'https://placekitten.com/300/200' },
    { id: 2, name: 'Complex B', address: '456 Oak Ave', image: 'https://placekitten.com/301/200' },
    { id: 3, name: 'Skyscraper C', address: '789 Pine Rd', image: 'https://placekitten.com/302/200' },
];

const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Manager' },
];
</script>

<style>
@import '@/assets/adminDashboard.css';
</style>