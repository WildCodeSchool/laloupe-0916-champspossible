function offreController(offreService) {

    this.offreService = offreService;

    this.load = () => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
        });
    };

    this.load()

    this.transfert = (filtre) => {
        localStorage.setItem("filtre", filtre)
    };


    this.OpenFilter = (filtre) => {
        // console.log("if")
        if (typeof(Storage) !== "undefined") {
            document.getElementById("filtreOffre").innerHTML = localStorage.getItem("filtre");
            this.filter(this.offres.type=localStorage.getItem("filtre"))

            // console.log(localStorage.getItem("filtre"))
        } else {
            // console.log("else")
        };
    }


}
