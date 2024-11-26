<template>
    <div class="form-group d-flex justify-content-center mt-3">
        <input
            max="1"
            v-for="(value, index) in pin" :key="index"
            type="text"
            class="form-control text-center ml-1 mx-md-1 input-pin"
            v-model="pin[index]"
            @input="handleInput(index, $event)"
            @keydown="handleBackspace(index, $event)"
            @paste="handlePaste"
            ref="inputs"
        />
    </div>
</template>
<script>
export default {
    props: ["value","size"],
    data: function () {
        let size = this.size || 5;
        return {
            pin: Array(size).fill(""),
        };
    },
    methods: {
        handleInput(index, event) {
            const value = event.data;
            // Permitir solo dígitos
            if (!/^\d?$/.test(value)) {
                this.$set(this.pin, index, ""); // Limpia si no es un dígito
                return;
            }

            this.$set(this.pin, index, value);

            // Mover al siguiente input si se ingresa un dígito válido
            if (value !== "" && index < this.pin.length - 1) {
                this.$refs.inputs[index + 1].focus();
            }
        },
        handleBackspace(index, event) {
            // Mover al input anterior si el campo está vacío identificado por el backspace
            if(event.keyCode === 8 && this.pin[index] === "" && index > 0) {
                this.$refs.inputs[index - 1].focus();
                return;
            }
            //si presiona enter se envia el formulario
            if (event.keyCode === 13) {
                if (this.pinValue.length === this.pin.length) {
                    this.$emit("submit");
                }
                return;
            }
            this.handleInput(index, event);
        },
        handlePaste(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del pegado

            // Obtiene el valor del portapapeles
            let pasteValue = (event.clipboardData || window.clipboardData).getData('text');

            // Solo se permiten dígitos
            pasteValue = pasteValue.replace(/[^\d]/g, "");

            const values = pasteValue.split("").slice(0, this.pin.length);
            values.forEach((digit, idx) => {
                this.$set(this.pin, idx, digit);
            });

            // Enfocar el siguiente campo vacío
            const emptyIndex = values.length < this.pin.length ? values.length : this.pin.length - 1;
            this.$refs.inputs[emptyIndex].focus();
        }
    },
    computed: {
        pinValue() {
            return this.pin.join("");
        }
    },
    watch: {
        pinValue: function(newVal) {
            this.$emit("update:value", newVal);
        }
    }
};
</script>

<style scoped>
    .input-pin {
        width: calc(1.25em + 1.3rem + 2px);
        font-size: 1.5rem;
    }
    @media only screen and (max-width: 767px) {
        .input-pin {
            padding: 0.1rem !important;
        }
    }
</style>
