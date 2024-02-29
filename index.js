
class validaCpf{
    constructor(cpfEnviado){
        Object.defineProperty(this,'cpfLimpo',{
            writable: true,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g,"")
        });
    }

    isSequenc(){
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }

    geraNovoCpf(){
        const cpfSemDigitos = this.cpfLimpo.slice(0,-2);
        const digito1 = validaCpf.geraDigito(cpfSemDigitos);
        const digito2 = validaCpf.geraDigito(cpfSemDigitos + digito1);

        this.novoCpf = cpfSemDigitos + digito1 + digito2; 
    }

    static geraDigito(cpfSemDigitos){
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for(let stringNumerica of cpfSemDigitos){
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.isSequenc())  return false;
        this.geraNovoCpf();

        return this.novoCpf === this.cpfLimpo;
    }
}

const validacpf = new validaCpf('070.987.720-03'/*'999.999.999-99'*/);
if(validacpf.valida()){
    console.log('valido');
}else{
    console.log('invalido');
}