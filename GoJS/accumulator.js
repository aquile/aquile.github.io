var accumulator = new Accumulator(1); // ��������� �������� 1
accumulator.read(); // �������� ���� prompt � �������� ��������
accumulator.read(); // �������� ���� prompt � �������� ��������
console.log(accumulator.value); // ������� ������� ��������

function Accumulator(a) {
    this.value = a;

    this.read = function () {
        this.value += +prompt("number", 0);
    };
}