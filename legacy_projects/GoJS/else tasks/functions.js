function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        return confirm('�������� ���������?');
    }
}

function checkAge(age) {
    return (age > 18) ? true : confirm('�������� ���������?');
}

function checkAge(age) {
    return (age > 18) || confirm('�������� ���������?');
}