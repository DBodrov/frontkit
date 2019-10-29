module.exports = {
    types: [
        {
            value: 'build',
            name: 'build:               Сборка проекта или изменения внешних зависимостей',
        },
        {
            value: 'ci',
            name: 'ci:                  Настройка CI и работа со скриптами',
        },
        {
            value: 'docs',
            name: 'docs:                Обновление документации',
        },
        {
            value: 'feat',
            name: 'feat:                Добавление нового функционала',
        },
        {
            value: 'fix',
            name: 'fix:                 Исправление ошибок',
        },
        {
            value: 'perf',
            name: 'perf:                Изменения направленные на улучшение производительности',
        },
        {
            value: 'refactor',
            name: 'refactor:            Рефакторинг кода',
        },
        {
            value: 'improvement',
            name: 'improvement          Улучшение кода без исправления ошибок или добавления новых функций',
        },
        {
            value: 'revert',
            name: 'revert:              Откат на предыдущие коммиты',
        },
        {
            value: 'style',
            name: 'style:               Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)',
        },
        {
            value: 'test',
            name: 'test:                Добавление тестов',
        },
        {
            value: 'chore',
            name: 'chore                Рутинное обновление кода (мерджи, ребейзы и т.п.)',
        },
        {
            value: 'BREAKING CHANGE',
            name: 'BREAKING CHANGE      Обратно несовместимое изменение кода',
        },
    ],

    // Область. Она характеризует фрагмент кода, которую затронули изменения
    scopes: [
        { name: 'project' },
        { name: 'components' },
        { name: 'containers' },
        { name: 'actions' },
        { name: 'constants' },
        { name: 'epics' },
        { name: 'models' },
        { name: 'reducers' },
    ],

    // Возможность задать спец ОБЛАСТЬ для определенного типа коммита
    scopeOverrides: {
        test: [{ name: 'snapshot' }, { name: 'e2e' }, { name: 'unit' }],
    },

    // Поменяем дефолтные вопросы
    messages: {
        type: 'Какие изменения вы вносите?',
        scope: '\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):',
        // Спросим если allowCustomScopes в true
        customScope: 'Укажите свою ОБЛАСТЬ:',
        subject: 'Напишите КОРОТКОЕ описание в ПОВЕЛИТЕЛЬНОМ наклонении:\n',
        body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
        breaking: 'Список BREAKING CHANGES (опционально):\n',
        footer: 'Место для метаданных (тикетов, ссылок и остального). Например: PRJ-999:\n',
        confirmCommit: 'Вас устраивает получившийся коммит?',
    },

    // Разрешим собственную ОБЛАСТЬ
    allowCustomScopes: true,

    // Запрет на Breaking Changes
    allowBreakingChanges: false,

    // Префикс для нижнего колонтитула
    footerPrefix: 'Metadata:',

    // limit subject length
    subjectLimit: 80,
};
