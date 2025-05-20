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
    const trainingScreen = document.getElementById('training-screen');
    const aiChatScreen = document.getElementById('ai-chat-screen');
    const metricsScreen = document.getElementById('metrics-screen');
    const loginScreen = document.getElementById('login-screen');
    
    // Configurar el evento de clic de la pantalla de bienvenida
    const welcomeClickable = document.getElementById('welcome-clickable');
    if (welcomeClickable) {
        welcomeClickable.addEventListener('click', function(e) {
            console.log('Click en pantalla de bienvenida');
            e.preventDefault();
            showScreen(mainScreen);
        });
    }
    
    // Botones principales
    const generalModeBtn = document.getElementById('general-mode');
    const specificModeBtn = document.getElementById('specific-mode');
    const configBtn = document.getElementById('config-button');
    const metricsButton = document.getElementById('metrics-config');
    
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
    
    // Botón de Evaluación
    const evaluationOption = document.getElementById('evaluation-option');

    // Modales
    const constructionModal = document.getElementById('construction-modal');
    const aiAssistantModal = document.getElementById('ai-assistant-modal');
    
    // Botones de retroceso
    const backButtons = document.querySelectorAll('.back-button');
    
    // Botones para cerrar modales
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Variables para el reproductor de entrenamiento
    let sessionTimer = null;
    let sessionProgress = 0;
    const SESSION_DURATION = 300; // 5 minutos en segundos
    let trainingPreviousScreen = generalModeScreen; // Pantalla anterior solo para el modo entrenamiento
    let chatPreviousScreen = mainScreen; // Variable para recordar la pantalla de origen del chat

    // Elementos del chat de IA
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    
    // Respuestas predefinidas del bot
    const botResponses = {
        greeting: [
            "¡Hola! ¿En qué puedo ayudarte hoy?",
            "¡Hola! ¿Listo para ser creativo?",
            "¡Hola! ¿En qué puedo inspirarte hoy?"
        ],
        idea: [
            "Aquí tienes una idea creativa: ¿Qué tal si creas una historia sobre un mundo donde los colores tienen emociones propias?",
            "¿Has pensado en crear un proyecto que combine música y pintura de forma interactiva?",
            "Te propongo este ejercicio: Imagina cómo sería un día en la vida de un objeto cotidiano desde su perspectiva."
        ],
        ejercicio: [
            "Ejercicio de lluvia de ideas: Escribe 10 usos diferentes para un clip en 2 minutos.",
            "Prueba este ejercicio: Cierra los ojos y describe en detalle un lugar que te guste sin usar adjetivos subjetivos.",
            "Aquí tienes un reto: Crea una historia usando solo palabras que empiecen con la letra 'C'."
        ],
        inspiracion: [
            "La creatividad es la inteligencia divirtiéndose. - Albert Einstein",
            "No hay reglas en el arte, solo resultados. - John Ruskin",
            "La inspiración existe, pero tiene que encontrarte trabajando. - Pablo Picasso"
        ]
    };

    // Funciones del reproductor
    function updateProgress() {
        const progressBar = document.querySelector('#training-screen .progress');
        const timeDisplay = document.querySelector('#training-screen .time-display');
        
        // Primero mostramos el tiempo actual
        const minutes = Math.floor(sessionProgress / 60);
        const seconds = sessionProgress % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Luego incrementamos el progreso
        sessionProgress++;
        const progress = (sessionProgress / SESSION_DURATION) * 100;
        progressBar.style.width = `${progress}%`;
        
        if (sessionProgress >= SESSION_DURATION) {
            stopSession();
        }
    }

    function startSession() {
        const playBtn = document.querySelector('#training-screen .play-btn i');
        const infoContent = document.querySelector('#training-screen .info-content');
        const timeDisplay = document.querySelector('#training-screen .time-display');
        
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
        
        // Asegurar que el contador esté en 00:00 durante la inicialización
        timeDisplay.textContent = '00:00';
        
        // Inicialización animada
        let dots = '';
        let initTimer = 0;
        infoContent.innerHTML = '<p>Inicializando</p>';
        
        const initInterval = setInterval(() => {
            dots = dots.length >= 6 ? '' : dots + ' .';
            infoContent.innerHTML = `<p>Inicializando${dots}</p>`;
            initTimer++;
            
            if (initTimer >= 10) {
                clearInterval(initInterval);
                infoContent.innerHTML = '<p>Lectura terminada</p>';
                setTimeout(() => {
                    infoContent.innerHTML = '<p>Sesión iniciada. Mantén una postura cómoda y relajada. Centra tu atención en el sonido que escucharás.</p>';
                    sessionTimer = setInterval(updateProgress, 1000);
                }, 1500);
            }
        }, 1000);
    }

    function pauseSession() {
        const playBtn = document.querySelector('#training-screen .play-btn i');
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
        clearInterval(sessionTimer);
        sessionTimer = null;
        
        const infoContent = document.querySelector('#training-screen .info-content');
        infoContent.innerHTML += '<p>Sesión en pausa.</p>';
    }

    function stopSession() {
        pauseSession();
        sessionProgress = 0;
        updateProgress();
        
        const infoContent = document.querySelector('#training-screen .info-content');
        infoContent.innerHTML = '<p>Sesión finalizada.</p>';
    }

    function resetSession() {
        stopSession();
        const infoContent = document.querySelector('#training-screen .info-content');
        infoContent.innerHTML = '<p>Sesión reiniciada. Pulsa play para comenzar.</p>';
    }

    // Eventos del reproductor
    document.querySelector('#training-screen .play-btn').addEventListener('click', function() {
        if (!sessionTimer) {
            startSession();
        } else {
            pauseSession();
        }
    });

    document.querySelector('#training-screen .restart-btn').addEventListener('click', resetSession);
    document.querySelector('#training-screen .end-btn').addEventListener('click', stopSession);

    // Inicializar el panel de información cuando se muestra la pantalla de entrenamiento
    trainingOption.addEventListener('click', function() {
        // Restaurar el título predeterminado cuando se accede desde el menú principal
        document.querySelector('#training-screen .section-title').textContent = 'Entrenamiento';
        trainingPreviousScreen = generalModeScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });

    // Navegación de Exploración Libre
    relaxationOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Relajación';
        trainingPreviousScreen = freeExplorationScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });

    // Navegación del Modo Específico - Programa Creativo Completo
    completeProgramOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Programa Creativo Completo';
        trainingPreviousScreen = specificModeScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });

    // Eventos para opciones de Asistencia por Etapas
    preparationOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Preparación';
        trainingPreviousScreen = stageAssistanceScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });
    
    incubationOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Incubación';
        trainingPreviousScreen = stageAssistanceScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });
    
    insightOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Insight';
        trainingPreviousScreen = stageAssistanceScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });
    
    // Eventos para opciones de Asistente Especializado
    verbalOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Verbal';
        trainingPreviousScreen = specializedAssistantScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });
    
    visualOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Visual';
        trainingPreviousScreen = specializedAssistantScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });
    
    scenicOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Escénica';
        trainingPreviousScreen = specializedAssistantScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });
    
    musicalOption.addEventListener('click', function() {
        document.querySelector('#training-screen .section-title').textContent = 'Musical';
        trainingPreviousScreen = specializedAssistantScreen;
        showScreen(trainingScreen);
        initMeasurementIndicators();
    });

    // Configurar el botón de Evaluación
    if (evaluationOption) {
        evaluationOption.addEventListener('click', function() {
            // Mostrar la pantalla de chat de IA
            showScreen(aiChatScreen);
            // Opcional: Enviar un mensaje inicial automático
            addMessage("¡Hola! Estoy aquí para ayudarte a evaluar tus ideas. ¿En qué puedo ayudarte con la evaluación de tu proceso creativo?");
        });
    }

    // Función para agregar un mensaje al chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Hacer scroll al último mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageDiv;
    }

    // Función para obtener una respuesta del bot
    function getBotResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.includes('hola') || lowerMsg.includes('holi') || lowerMsg.includes('hey')) {
            return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        } else if (lowerMsg.includes('idea') || lowerMsg.includes('creativo') || lowerMsg.includes('creativa')) {
            return botResponses.idea[Math.floor(Math.random() * botResponses.idea.length)];
        } else if (lowerMsg.includes('ejercicio') || lowerMsg.includes('práctica') || lowerMsg.includes('entrenar')) {
            return botResponses.ejercicio[Math.floor(Math.random() * botResponses.ejercicio.length)];
        } else if (lowerMsg.includes('inspiración') || lowerMsg.includes('inspirame') || lowerMsg.includes('motivación')) {
            return botResponses.inspiracion[Math.floor(Math.random() * botResponses.inspiracion.length)];
        } else {
            const defaultResponses = [
                "Interesante, ¿puedes contarme más sobre eso?",
                "¿Cómo te hace sentir eso?",
                "Eso es fascinante. ¿Qué más se te ocurre?",
                "Voy a pensar en una respuesta creativa... Mientras tanto, ¿has probado a mirarlo desde otra perspectiva?",
                "La creatividad es un viaje. ¿Hacia dónde te gustaría ir ahora?"
            ];
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
    }

    // Función para manejar el envío de mensajes
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Agregar mensaje del usuario
        addMessage(message, true);
        chatInput.value = '';
        
        // Simular tiempo de respuesta del bot
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
        }, 800);
    }

    // Event Listeners para el chat
    sendMessageBtn.addEventListener('click', handleSendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Modificar los botones de Estimulación Creativa e Inspiración Aleatoria
    const creativeStimulationBtn = document.getElementById('creative-stimulation-option');
    const randomInspirationBtn = document.getElementById('random-inspiration-option');
    
    if (creativeStimulationBtn) {
        creativeStimulationBtn.addEventListener('click', () => {
            // Limpiar el chat
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        ¡Hola! Estoy aquí para ayudarte con ejercicios de estimulación creativa. ¿En qué necesitas ayuda?
                    </div>
                </div>`;
            chatPreviousScreen = freeExplorationScreen; // Establecer la pantalla de origen como Exploración Libre
            showScreen(aiChatScreen);
        });
    }
    
    if (randomInspirationBtn) {
        randomInspirationBtn.addEventListener('click', () => {
            // Limpiar el chat
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        ¡Inspiración al poder! ¿Listo para recibir una dosis de creatividad? ¿Sobre qué tema te gustaría que te inspire hoy?
                    </div>
                </div>`;
            chatPreviousScreen = generalModeScreen; // Establecer la pantalla de origen como Modo General
            showScreen(aiChatScreen);
        });
    }

    // Elementos de la pantalla de login
    const loginButton = document.getElementById('login-button');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const userConfigButton = document.getElementById('user-config');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const registerAccountLink = document.getElementById('register-account');
    const googleLoginBtn = document.querySelector('.social-btn.google');
    const facebookLoginBtn = document.querySelector('.social-btn.facebook');

    // Mostrar/ocultar contraseña
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Manejar clic en el botón de usuario en la configuración
    if (userConfigButton) {
        userConfigButton.addEventListener('click', function(e) {
            e.preventDefault();
            showScreen(loginScreen);
        });
    }

    // Manejar envío del formulario de login
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            
            // Validación básica
            if (!email || !password) {
                alert('Por favor, completa todos los campos');
                return;
            }
            
            // Aquí iría la lógica de autenticación
            console.log('Iniciando sesión con:', email);
            // Simulamos un inicio de sesión exitoso
            setTimeout(() => {
                // Mostrar mensaje de éxito
                alert('¡Inicio de sesión exitoso!');
                // Redirigir a la pantalla principal o de perfil
                showScreen(mainScreen);
            }, 1000);
        });
    }

    // Manejar clic en "¿Olvidaste tu contraseña?"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Función de recuperación de contraseña en desarrollo');
        });
    }

    // Manejar clic en "Crear cuenta"
    if (registerAccountLink) {
        registerAccountLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Pantalla de registro en desarrollo');
        });
    }

    // Inicio de sesión con Google
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Inicio de sesión con Google en desarrollo');
        });
    }

    // Inicio de sesión con Facebook
    if (facebookLoginBtn) {
        facebookLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Inicio de sesión con Facebook en desarrollo');
        });
    }

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
        chatPreviousScreen = freeExplorationScreen; // Establecer la pantalla de origen
        showScreen(freeExplorationScreen);
    });
    
    // Navegación de Exploración Libre
    creativeStimulationOption.addEventListener('click', function() {
        chatPreviousScreen = freeExplorationScreen; // Establecer la pantalla de origen como Exploración Libre
        showScreen(aiChatScreen);
    });
    
    randomInspirationOption.addEventListener('click', function() {
        chatPreviousScreen = generalModeScreen; // Establecer la pantalla de origen como Modo General
        showScreen(aiChatScreen);
    });
    
    aiAssistantInfo.addEventListener('click', function() {
        showModal(aiAssistantModal);
    });
    
    // Navegación del Modo Específico
    stageAssistanceOption.addEventListener('click', function() {
        chatPreviousScreen = stageAssistanceScreen; // Establecer la pantalla de origen
        showScreen(stageAssistanceScreen);
    });

    specializedAssistantOption.addEventListener('click', function() {
        chatPreviousScreen = specializedAssistantScreen; // Establecer la pantalla de origen
        showScreen(specializedAssistantScreen);
    });
    
    // Manejo de botones de regreso
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentScreen = button.closest('.screen');
            
            // Comportamiento especial solo para la pantalla de entrenamiento
            if (currentScreen === trainingScreen) {
                if (trainingPreviousScreen) {
                    showScreen(trainingPreviousScreen);
                    return;
                }
            }
            
            // Comportamiento para el chat de IA
            if (currentScreen === aiChatScreen) {
                // Volver a la pantalla de origen guardada
                showScreen(chatPreviousScreen);
                return;
            }
            
            // Comportamiento estándar para las demás pantallas
            if (currentScreen === freeExplorationScreen) {
                showScreen(generalModeScreen);
            } else if (currentScreen === stageAssistanceScreen || currentScreen === specializedAssistantScreen) {
                showScreen(specificModeScreen);
            } else if (currentScreen === generalModeScreen || currentScreen === specificModeScreen) {
                showScreen(mainScreen);
            } else if (currentScreen === configScreen) {
                showScreen(mainScreen);
            } else {
                // Por defecto, volver a la pantalla principal
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
    
    // Configuración inicial de la aplicación
    function initializeApp() {
        // Configurar el botón de métricas
        if (metricsButton) {
            metricsButton.addEventListener('click', () => {
                showScreen(metricsScreen);
                updateWeekDisplay();
            });
        }
        
        // Configurar la pantalla de métricas
        setupMetricsScreen();
        
        // Inicializar gráficos cuando se muestre la pantalla de métricas
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (metricsScreen.classList.contains('active') && !concentrationChart) {
                        initCharts();
                    }
                }
            });
        });
        
        observer.observe(metricsScreen, { attributes: true });
    }

    // Inicializar la aplicación cuando el DOM esté listo
    initializeApp();
});

// Función para inicializar los indicadores de medición
function initMeasurementIndicators() {
    const indicators = {
        attention: {
            element: document.querySelector('.indicator:nth-child(1) .indicator-fill'),
            value: 0,
            target: 0,
            speed: 0.02
        },
        relaxation: {
            element: document.querySelector('.indicator:nth-child(2) .indicator-fill'),
            value: 0,
            target: 0,
            speed: 0.015
        },
        creativity: {
            element: document.querySelector('.indicator:nth-child(3) .indicator-fill'),
            value: 0,
            target: 0,
            speed: 0.025
        }
    };

    // Inicializar todos los indicadores a 0
    function resetIndicators() {
        for (const key in indicators) {
            const indicator = indicators[key];
            indicator.value = 0;
            indicator.target = 0;
            updateIndicatorUI(indicator, 0);
        }
    }

    // Actualizar la interfaz de un indicador
    function updateIndicatorUI(indicator, percentage) {
        indicator.element.style.width = `${percentage}%`;
        indicator.element.setAttribute('data-value', Math.round(percentage));
        indicator.element.nextElementSibling.textContent = `${Math.round(percentage)}%`;
    }

    // Iniciar la animación de llenado hasta la mitad
    function startInitialFill() {
        // Establecer el objetivo al 50% para todos los indicadores
        for (const key in indicators) {
            indicators[key].target = 50;
        }
        
        // Iniciar la actualización continua
        updateIndicators();
    }

    // Función para actualizar los valores de los indicadores
    function updateIndicators() {
        let stillUpdating = false;

        // Actualizar cada indicador
        for (const key in indicators) {
            const indicator = indicators[key];
            
            // Si el valor actual no ha alcanzado el objetivo
            if (Math.abs(indicator.value - indicator.target) > 0.1) {
                indicator.value += (indicator.target - indicator.value) * indicator.speed;
                updateIndicatorUI(indicator, indicator.value);
                stillUpdating = true;
            }
        }

        // Si algún indicador aún se está actualizando, continuar la animación
        if (stillUpdating) {
            requestAnimationFrame(updateIndicators);
        }
    }

    // Inicializar
    resetIndicators();
    
    // Después de un breve retraso, comenzar el llenado hasta la mitad
    setTimeout(startInitialFill, 500);
}

// Llamar a la función de inicialización cuando la pantalla de entrenamiento esté activa
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los indicadores cuando la pantalla de entrenamiento esté activa
    const trainingScreen = document.getElementById('training-screen');
    if (trainingScreen) {
        initMeasurementIndicators();
    }
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

// ===== MÉTRICAS =====
// Elementos de la pantalla de métricas
const metricsScreen = document.getElementById('metrics-screen');
const metricsButton = document.getElementById('metrics-config'); // Cambiado a metrics-config
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const currentWeekSpan = document.getElementById('current-week');
const exportPdfBtn = document.getElementById('export-pdf');

// Variables para el control de la semana actual
let currentWeekOffset = 0;

// Datos de ejemplo para las métricas
const generateMockSessionData = (days = 7) => {
    const today = new Date();
    const sessions = [];
    
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (days - 1 - i));
        
        sessions.push({
            date: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
            duration: Math.floor(Math.random() * 45) + 5, // 5-50 minutos
            concentration: Math.floor(Math.random() * 40) + 60, // 60-100%
            relaxation: Math.floor(Math.random() * 50) + 50, // 50-100%
            score: Math.floor(Math.random() * 30) + 70 // 70-100 puntos
        });
    }
    
    return sessions;
};

// Inicializar gráficos
let concentrationChart, relaxationChart, weeklyProgressChart;

const initCharts = () => {
    const sessionData = generateMockSessionData();
    const labels = sessionData.map(session => session.date);
    
    // Gráfico de concentración
    const concentrationCtx = document.getElementById('concentration-chart').getContext('2d');
    concentrationChart = new Chart(concentrationCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Concentración',
                data: sessionData.map(s => s.concentration),
                borderColor: '#6200ea',
                backgroundColor: 'rgba(98, 0, 234, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    min: 0, 
                    max: 100,
                    ticks: { callback: value => value + '%' }
                },
                x: { display: false }
            }
        }
    });
    
    // Gráfico de relajación
    const relaxationCtx = document.getElementById('relaxation-chart').getContext('2d');
    relaxationChart = new Chart(relaxationCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Relajación',
                data: sessionData.map(s => s.relaxation),
                borderColor: '#2979ff',
                backgroundColor: 'rgba(41, 121, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    min: 0, 
                    max: 100,
                    ticks: { callback: value => value + '%' }
                },
                x: { display: false }
            }
        }
    });
    
    // Gráfico de progreso semanal
    const weeklyCtx = document.getElementById('weekly-progress-chart').getContext('2d');
    weeklyProgressChart = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Concentración',
                    data: sessionData.map(s => s.concentration),
                    backgroundColor: 'rgba(98, 0, 234, 0.7)',
                    borderRadius: 4
                },
                {
                    label: 'Relajación',
                    data: sessionData.map(s => s.relaxation),
                    backgroundColor: 'rgba(41, 121, 255, 0.7)',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true,
                    max: 100,
                    ticks: { callback: value => value + '%' }
                }
            }
        }
    });
    
    // Actualizar tabla de sesiones
    updateSessionsTable(sessionData);
};

// Actualizar la tabla de sesiones
const updateSessionsTable = (sessions) => {
    const tbody = document.getElementById('sessions-table-body');
    tbody.innerHTML = '';
    
    sessions.forEach(session => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${session.date}</td>
            <td>${session.duration} min</td>
            <td>${session.concentration}%</td>
            <td>${session.relaxation}%</td>
            <td><span class="score-badge">${session.score}</span></td>
        `;
        
        tbody.appendChild(row);
    });
};

// Actualizar la semana mostrada
const updateWeekDisplay = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1 + (currentWeekOffset * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const options = { day: '2-digit', month: 'short' };
    const startStr = weekStart.toLocaleDateString('es-ES', options);
    const endStr = weekEnd.toLocaleDateString('es-ES', options);
    
    currentWeekSpan.textContent = `${startStr} - ${endStr}`;
    
    // Actualizar datos con la nueva semana
    if (concentrationChart) concentrationChart.destroy();
    if (relaxationChart) relaxationChart.destroy();
    if (weeklyProgressChart) weeklyProgressChart.destroy();
    
    initCharts();
};

// Event Listeners para la pantalla de métricas
const setupMetricsScreen = () => {
    // Navegación entre semanas
    prevWeekBtn.addEventListener('click', () => {
        currentWeekOffset--;
        updateWeekDisplay();
    });

    nextWeekBtn.addEventListener('click', () => {
        currentWeekOffset++;
        updateWeekDisplay();
    });

    // Botón de exportar PDF
    exportPdfBtn.addEventListener('click', () => {
        // Simular descarga de PDF
        alert('Exportando métricas a PDF...');
        // En una implementación real, aquí se generaría y descargaría el PDF
    });

    // Botón de regresar
    metricsScreen.querySelector('.back-button').addEventListener('click', () => {
        showScreen('config-screen');
    });
};
