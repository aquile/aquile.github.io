//�������� �������. JS. ���� 8.
//������� 1 (Chaining)
//
//���� ������ ladder
//
//var ladder = {
//    step: 0,
//    up: function() { // ����� �� ��������
//        this.step++;
//    },
//    down: function() { // ���� �� ��������
//        this.step--;
//    },
//    showStep: function() { // ������� ������� ���������
//        alert( this.step );
//    }
//};
//������, ��� ����������������� ������ ���������� ������� �������, ����� ������ ��� ������� ���:
//
//    ladder.up();
//ladder.up();
//ladder.down();
//ladder.showStep(); // 1
//������������� ��� ������� �������, ����� ������ ����� ���� ������ ��������:
//
//    ladder.up().up().down().up().down().showStep(); // 1
//����� ������ ���������� �������� (chaining)
//
//������� 2 (Calculator)
//
//�������� ����������� Calculator, ������� ������ ����������� �������-������������.
//
//    ��� ������ ������� �� ���� ������, ������� ����� ������ ���� �� ������.
//
//    ������ ��� ������: ����� calculate(str) ��������� ������, �������� �1 + 2�, � ����� �������� �������� ������ �������� ����λ (�� ������ ������� ������ ��������), � ���������� ���������. �������� ���� + � ����� -. ������ �������������:
//
//    var calc = new Calculator;
//
//console.log( calc.calculate('3 + 7') ); // 10
//������ ��� � �������� ������������ ����� addMethod(name, func), ������� ���� ����������� ����� ��������. �� �������� ��� �������� name � ������� �� ���� ���������� func(a,b), ������� ������ � �������������. ��������, ������� �������� �������� , �������� / � �������� � ������� *:
//
//var powerCalc = new Calculator;
//powerCalc.addMethod('*', function(a, b) {
//    return a * b;
//});
//powerCalc.addMethod('/', function(a, b) {
//    return a / b;
//});
//powerCalc.addMethod('**', function(a, b) {
//    return Math.pow(a, b);
//});
//
//var result = powerCalc.calculate('2 ** 3');
//console.log( result ); // 8
//��������� ������ � ������� �������������� ��������� � ���� ������ �� ���������.
//    ����� � �������� ����� �������� �� ���������� ��������. ����� ���� ����� ���� ������.
//    ������������� ��������� ������. ����� ��� ������ ���� � ������ ����.
//    ������� 3 (get/set ��������)
//
//� ��� ���� ������ User, ������� ������ ��� � ������� � �������� this.fullName:
//
//function User(fullName) {
//    this.fullName = fullName;
//}
//
//var vasya = new User('��������� ������');
//��� � ������� ������ ����������� ��������.
//
//    ��������, ����� ���� �������� �������� firstName � lastName, ������ �� ������ �� ������, �� � �� ������, ��� ���:
//
//    var vasya = new User('��������� ������');
//
//// ������ firstName/lastName
//console.log( vasya.firstName ); // ���������
//console.log( vasya.lastName ); // ������
//
//// ������ � lastName
//vasya.lastName = '�������';
//
//console.log( vasya.fullName ); // ��������� �������
//�����: � ���� ������ fullName ������ �������� ���������, � firstName/lastName � ����������� ����� get/set. ������ ������������ ����� �� � ����.
//
//    ������� 4 (Object counter)
//
//�������� � ����������� Article:
//
//    ������� ������ ���������� ��������� ��������.
//    ����������� ���� ���������� ���������� �������.
//    ����������� ��� ����� ����������� ��������.
//    ����� ����� Article.showStats() ������� �� � ������.
//
//    �������������:
//
//function Article() {
//    this.created = new Date();
//    // ... ��� ��� ...
//}
//
//new Article();
//new Article();
//
//Article.showStats(); // �����: 2, ���������: (����)
//
//new Article();
//
//Article.showStats(); // �����: 3, ���������: (����)

//Task1
var ladder = {
    step: 0,
    up: function () { // ����� �� ��������
        this.step++;
        return this.step;
    },
    down: function () { // ���� �� ��������
        this.step--;
        return this.step;
    },
    showStep: function () { // ������� ������� ���������
        alert(this.step);
    }
};

ladder.up().up().down().up().down().showStep(); // 1

//������, ��� ����������������� ������ ���������� ������� �������, ����� ������ ��� ������� ���:
//
//    ladder.up();
//ladder.up();
//ladder.down();
//ladder.showStep(); // 1
//������������� ��� ������� �������, ����� ������ ����� ���� ������ ��������:
//
//    ladder.up().up().down().up().down().showStep(); // 1
//����� ������ ���������� �������� (chaining)


//Tak2

var calc = new Calculator;

console.log(calc.calculate('3 + 7')); // 10
������
���
�
��������
������������
�����
addMethod(name, func), �������
����
�����������
�����
��������.��
��������
���
��������
name
�
�������
��
����
����������
func(a, b), �������
������
�
�������������.��������, �������
��������
�������� , �������� / �
��������
�
������� *
:

var powerCalc = new Calculator;
powerCalc.addMethod('*', function (a, b) {
    return a * b;
});
powerCalc.addMethod('/', function (a, b) {
    return a / b;
});
powerCalc.addMethod('**', function (a, b) {
    return Math.pow(a, b);
});

var result = powerCalc.calculate('2 ** 3');
console.log(result); // 8