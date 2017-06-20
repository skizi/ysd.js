YSD.KeyManager = (function(){


	
	function KeyManager(){

		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.shift = false;
		this.alt = false;


        window.onkeydown = this.keyDown.bind(this);
        window.onkeyup = this.keyUp.bind(this);

	}


	var p = KeyManager.prototype;
    p.keyDown = function (e) {
        e.preventDefault();

        if (e.keyCode === 37 || e.keyCode === 65) {
            this.x = -1;
        }
        if (e.keyCode === 38 || e.keyCode === 87) {
            this.z = 1;
        }

        if (e.keyCode === 39 || e.keyCode === 68) {
            this.x = 1;
        }

        if (e.keyCode === 40 || e.keyCode === 83) {
            this.z = -1;
        }

        if (e.keyCode === 32) {
            this.y = 1;
        }

        if (e.keyCode === 16) {
            this.shift = true;
        }

        if (e.keyCode === 18) {
            this.alt = true;
        }

        if (e.keyCode === 13) {
            Vars.enterDown();
        }
    };

    p.keyUp = function (e) {
        e.preventDefault();

        if (e.keyCode === 37 || e.keyCode === 65) {
            this.x = 0;
        }
        if (e.keyCode === 38 || e.keyCode === 87) {
            this.z = 0;
        }

        if (e.keyCode === 39 || e.keyCode === 68) {
            this.x = 0;
        }

        if (e.keyCode === 40 || e.keyCode === 83) {
            this.z = 0;
        }

        if (e.keyCode === 32) {
            this.y = 0;
        }

        if (e.keyCode === 16) {
            this.shift = false;
        }

        if (e.keyCode === 18) {
            this.alt = false;
        }
    };


	return KeyManager;

})();