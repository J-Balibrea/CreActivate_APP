// CreActivate App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('El script se está cargando correctamente');
    // Elementos principales
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');
    const generalModeScreen = document.getElementById('general-mode-screen');
    const specificModeScreen = document.getElementById('specific-mode-screen');
    const freeExplorationScreen = document.getElementById('free-exploration-screen');
    const stageAssistanceScreen = document.getElementById('stage-assistance-screen');
    const specializedAssistantScreen = document.getElementById('specialized-assistant-screen');
    const configScreen = document.getElementById('config-screen');
    
    // Botones principales
    const generalModeBtn = document.getElementById('general-mode');
    const specificModeBtn = document.getElementById('specific-mode');
    const configBtn = document.getElementById('config-button');
    
    // Opciones del Modo General
    const trainingOption = document.getElementById('training-option');
    const freeExplorationOption = document.getElementById('free-exploration-option');
    const randomInspirationOption = document.getElementById('random-inspiration-option');
    
    // Opciones de Exploración Libre
    const relaxationOption = document.getElementById('relaxation-option');
    const creativeStimulationOption = document.getElementById('creative-stimulation-option');
    const aiAssistantInfo = document.getElementById('ai-assistant-info');
    
    // Opciones del Modo Específico
    const completeProgramOption = document.getElementById('complete-program-option');
    const stageAssistanceOption = document.getElementById('stage-assistance-option');
    const specializedAssistantOption = document.getElementById('specialized-assistant-option');
    
    // Opciones de Asistencia por Etapa
    const preparationOption = document.getElementById('preparation-option');
    const incubationOption = document.getElementById('incubation-option');
    const insightOption = document.getElementById('insight-option');
    
    // Opciones de Asistente Especializado
    const verbalOption = document.getElementById('verbal-option');
    const visualOption = document.getElementById('visual-option');
    const scenicOption = document.getElementById('scenic-option');
    const musicalOption = document.getElementById('musical-option');
    
    // Modales
    const constructionModal = document.getElementById('construction-modal');
    const aiAssistantModal = document.getElementById('ai-assistant-modal');
    
    // Botones de retroceso
    const backButtons = document.querySelectorAll('.back-button');
    
    // Botones para cerrar modales
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Función para cambiar de pantalla
    function showScreen(screen) {
        console.log('Cambiando a pantalla:', screen.id);
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.style.transform = 'translate(-50%, -50%) translateY(20px)';
            s.style.opacity = '0';
        });
        
        // Mostrar la pantalla seleccionada
        screen.classList.add('active');
        screen.style.transform = 'translate(-50%, -50%) translateY(0)';
        screen.style.opacity = '1';
    }
    
    // Función para mostrar modal
    function showModal(modal) {
        modal.classList.add('active');
    }
    
    // Función para cerrar modal
    function closeModal(modal) {
        modal.classList.remove('active');
    }
    
    // Iniciar: Pantalla de bienvenida clickeable
    document.getElementById('welcome-clickable').addEventListener('click', function(e) {
        console.log('Click en pantalla de bienvenida');
        e.preventDefault();
        showScreen(mainScreen);
    });
    
    // Navegación principal
    generalModeBtn.addEventListener('click', function() {
        showScreen(generalModeScreen);
    });
    
    specificModeBtn.addEventListener('click', function() {
        showScreen(specificModeScreen);
    });
    
    configBtn.addEventListener('click', function() {
        showScreen(configScreen);
    });
    
    // Navegación del Modo General
    freeExplorationOption.addEventListener('click', function() {
        showScreen(freeExplorationScreen);
    });
    
    trainingOption.addEventListener('click', function() {
        // Por ahora no hace nada
    });
    
    randomInspirationOption.addEventListener('click', function() {
        // Por ahora no hace nada
    });
    
    // Navegación de Exploración Libre
    relaxationOption.addEventListener('click', function() {
        // Por ahora no hace nada
    });
    
    creativeStimulationOption.addEventListener('click', function() {
        // Por ahora no hace nada
    });
    
    aiAssistantInfo.addEventListener('click', function() {
        showModal(aiAssistantModal);
    });
    
    // Navegación del Modo Específico
    completeProgramOption.addEventListener('click', function() {
        // Por ahora no hace nada
    });
    
    stageAssistanceOption.addEventListener('click', function() {
        showScreen(stageAssistanceScreen);
    });
    
    specializedAssistantOption.addEventListener('click', function() {
        showScreen(specializedAssistantScreen);
    });
    
    // Eventos para opciones
    const inactiveElements = [
        preparationOption, 
        incubationOption, 
        insightOption,
        verbalOption,
        visualOption,
        scenicOption,
        musicalOption
    ];
    
    inactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            // Por ahora no hace nada
        });
    });
    
    // Manejo de botones de regreso
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener la pantalla actual
            const currentScreen = button.closest('.screen');
            
            // Determinar a qué pantalla volver
            if (currentScreen === freeExplorationScreen) {
                showScreen(generalModeScreen);
            } else if (currentScreen === stageAssistanceScreen || currentScreen === specializedAssistantScreen) {
                showScreen(specificModeScreen);
            } else if (currentScreen === generalModeScreen || currentScreen === specificModeScreen) {
                showScreen(mainScreen);
            } else if (currentScreen === configScreen) {
                showScreen(mainScreen);
            }
        });
    });
    
    // Cerrar modales
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Animación suave para las transiciones
    function addTransitionClass() {
        document.querySelectorAll('.screen:not(.active)').forEach(screen => {
            screen.style.transform = 'translate(-50%, -50%) translateY(20px)';
            screen.style.opacity = '0';
        });
    }
    
    // Llamar a la función después de cualquier transición
    document.addEventListener('transitionend', addTransitionClass);
    
    // Inicialmente asegurar que las pantallas inactivas tengan la transformación correcta
    addTransitionClass();
});

// Animación de entrada en la pantalla de bienvenida
document.addEventListener('DOMContentLoaded', () => {
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeContent) {
        // Pequeña demora para asegurar que todo está listo
        setTimeout(() => {
            welcomeContent.classList.add('animate');
        }, 100);
    }
});
