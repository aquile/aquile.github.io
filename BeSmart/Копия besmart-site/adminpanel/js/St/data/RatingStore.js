St.data.RatingStore = new Ext.data.ArrayStore({
    idProperty  : 'id',
    loaded      : true,
    fields      : [
        { name  : 'id' },
        { name  : 'name' }
    ],
    data: [
        ['1', 'Очень плохо (1)'],
        ['2', 'Плохо (2)'],
        ['3', 'Средне (3)'],
        ['4', 'Хорошо (4)'],
        ['5', 'Отлично (5)']
    ]
});