var calculator = {
    read: function() {
        this.a = prompt('type anything...');
        this.b = prompt('type one more');
    },
    sum: function() {
        var sum = this.a + this.b;
        return sum;
    },
    mul: function() {
        var mul = this.a * this.b;
        return mul;
    }
}

//�������� �� �� ������

var calculator = {
    read: function() {
        this.a = +prompt('type anything...', 0); // 0 - ��� �������� �� ���������, ���� ������ ������ �������
        this.b = +prompt('type one more', 0);
    },
    sum: function() {
        return this.a + this.b;

    },
    mul: function() {
        return this.a * this.b;

    }
}
