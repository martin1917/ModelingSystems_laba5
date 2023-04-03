//ф-ции
const f1 = (y) => -6 * y[0] + 1 * y[3];
const f2 = (y) => -6 * y[1] + 2 * y[0] + 5 * y[2];
const f3 = (y) => -5 * y[2] + 4 * y[0];
const f4 = (y) => -1 * y[3] + 6 * y[1];

// массив ф-ций
const fs = [f1, f2, f3, f4];

// кол-во ф-ций
const countF = fs.length;

// граница времени
const T = 10.0;

// получение коэфициентов для метода Рунге-Кутта
const getK = (y, h) => {
    let k = [];
    for(let j = 0; j < countF; j++) {
        const f = fs[j];
        k.push(h * f(y));
    }
    return k;
};

// метод рунге-кутта 4 порядка
const start = (h) => {
    const values = [[0.25, 0.25, 0.0, 0.50]];
	const times = [0.0];
	
    let t = 0.0;
    while (t < T) {
        const prevY = values.at(-1);
        
        let k1 = getK(prevY, h);
  
        const newY2 = prevY.map((el, j) => el += 0.5 * k1[j]);
        let k2 = getK(newY2, h);

        const newY3 = prevY.map((el, j) => el += 0.5 * k2[j]);
        let k3 = getK(newY3, h);

        const newY4 = prevY.map((el, j) => el += k3[j]);
        let k4 = getK(newY4, h);

        const newY = [];
        for(let j = 0; j < countF; j++) {
            const val = prevY[j] + (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]) / 6;
            newY.push(val);

        }

        values.push(newY);
        t += h
        times.push(t);
    }

    return {
        times, values
    };
};

let res = start(0.1);
let values = res.values.at(-1);
for (let i = 0; i < values.length; i++) {
	let f = fs[i];
	console.log(Math.abs(f(values)) < 1e-10);
}