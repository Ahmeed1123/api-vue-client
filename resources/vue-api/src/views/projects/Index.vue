<template>
  <div class="min-h-screen py-16 px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="mb-4">
          Featured <span class="text-primary">Projects</span>
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          A showcase of my recent work, highlighting innovative solutions across various technologies.
        </p>
      </div>

      <!-- Filter System -->
      <div class="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
            @click="selectedFilter = 'all'"
            :class="selectedFilter === 'all' ? 'bg-primary text-primary-foreground' : 'glass'"
            class="px-6 py-2 rounded-xl transition-all duration-200 hover:scale-105"
        >
          All
        </button>
        <button
            v-for="tech in technologies"
            :key="tech"
            @click="selectedFilter = tech"
            :class="selectedFilter === tech ? 'bg-primary text-primary-foreground' : 'glass'"
            class="px-6 py-2 rounded-xl transition-all duration-200 hover:scale-105"
        >
          {{ tech }}
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div
            v-for="(stat, index) in stats"
            :key="index"
            class="glass rounded-xl p-6 text-center"
        >
          <div class="text-3xl mb-2">{{ stat.value }}</div>
          <div class="text-muted-foreground">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Masonry Layout Projects -->
      <div ref="projectsGrid" class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card break-inside-avoid mb-6"
        >
          <div class="relative group glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
            <!-- Image -->
            <router-link :to="`/project/${project.id}`" class="block relative overflow-hidden">
              <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  :style="{ height: project.height }"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
            </router-link>

            <!-- Content -->
            <div class="p-6">
              <router-link :to="`/project/${project.id}`">
                <h3 class="mb-2 group-hover:text-primary transition-colors">
                  {{ project.title }}
                </h3>
              </router-link>

              <p class="text-muted-foreground mb-4 line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Animated Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="animated-border px-3 py-1 rounded-lg text-xs"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Links -->
              <div class="flex items-center gap-3">
                <a
                    v-if="project.demoLink"
                    :href="project.demoLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <span class="text-sm">Demo</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                    v-if="project.githubLink"
                    :href="project.githubLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span class="text-sm">Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="mb-2">No projects found</h3>
        <p class="text-muted-foreground">Try selecting a different filter</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';

const selectedFilter = ref('all');
const projectsGrid = ref(null);

const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management and secure payments.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    height: '300px',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: '2',
    title: 'AI Task Manager',
    description: 'Smart task management with AI-powered prioritization and natural language processing.',
    tags: ['Vue.js', 'TypeScript', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
    height: '250px',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: '3',
    title: 'Collaboration Tool',
    description: 'Real-time workspace with live editing, video calls, and team communication.',
    tags: ['React', 'WebRTC', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=700&fit=crop',
    height: '350px',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: '4',
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics platform with customizable dashboards and real-time visualization.',
    tags: ['Vue.js', 'Python', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    height: '280px',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: '5',
    title: 'Social Platform',
    description: 'Modern social networking with photo sharing, stories, and advanced privacy controls.',
    tags: ['React', 'Firebase', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=550&fit=crop',
    height: '320px',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: '6',
    title: 'Learning Management',
    description: 'Complete LMS with course creation, video streaming, and progress tracking.',
    tags: ['Next.js', 'GraphQL', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    height: '290px',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
];

const technologies = ['React', 'Vue.js', 'TypeScript', 'Node.js', 'Python'];

const stats = [
  { value: '6+', label: 'Projects' },
  { value: '50+', label: 'Technologies' },
  { value: '98%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
];

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'all') {
    return projects;
  }
  return projects.filter(project =>
      project.tags.some(tag => tag.toLowerCase().includes(selectedFilter.value.toLowerCase()))
  );
});

onMounted(() => {
  // Animate projects on load
  gsap.from('.project-card', {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
  });
});
</script>

<style scoped>
.project-card {
  transform: translateZ(0);
  will-change: transform;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
