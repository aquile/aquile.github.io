function makeBuffer() {
    var obj = '';


    var fn = function (value) {
        if (value) {
            obj += value;
            return obj;
        }
        return obj;
    };
    fn.clear = function () {
        obj = '8';
        return obj;
    };

    return fn;
}

var buffer = makeBuffer();

// �������� �������� � ������
buffer('���������');
buffer(' ������������');
buffer(' �����!');


buffer.clear();
// �������� ������� ��������
console.log(buffer());
// ��������� ������������ �����!