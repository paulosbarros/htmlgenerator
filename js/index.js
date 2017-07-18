var generator = ElementGenerator('Elements', 'html');

var elemento1 = {id:123,content:'coluna'};
generator.build('Kanban-Column', elemento1, 'main');

var elemento2 = {id:456,content:'item'};
generator.build('Kanban-Item', elemento2, elemento1.id);