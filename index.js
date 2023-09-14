//CONVERT TODAY DATE TO INPUT FORMAT :

//On ne peut pas passer à l'input la date du jour sous ce format là (car l'input n'accepte que le YYYY-mm-dd)
// start_date.value = new Date(); X

//On transforme la date du jour en la déclarant dans une variable, et on lui applique la méthode ".toISOString" pour avoir le bon format, puis ".split" pour casser en deux éléments au niveau du T, puis on lui demande le premier élément du tableau [0] :
const today = new Date().toISOString().split("T")[0];
// console.log(today);

//Donner la valeur trouvée dans la variable à l'input :
start_date.value = today;

//Donner une valeur minimum à l'input "start_date" afin que le user ne puisse pas réserver avant la date du jour :
start_date.min = today;



//TOMORROW DATE CALCUL :

//Créer une variable :
let tomorrow = new Date();

//On lui ajoute un jour par rapport à aujourd'hui :
//".setDate" : met en place une date
//".getDate() + 1 " : accède au jour suivant
tomorrow.setDate(tomorrow.getDate() + 1);

//Le new Date() ne fonctionnera pas dans l'input (pas le bon format), donc :
//CONVERT TO INPUT FORMAT :
//Même technique que pour la date du jour :
let tomorrowFormat = tomorrow.toISOString().split("T")[0];
// console.log(tomorrowFormat);

//Donner la valeur trouvée dans la variable à l'input :
end_date.value = tomorrowFormat;

//Donner une valeur minimum à l'input afin qu'il affiche le jour suivant de la date de start_date :
end_date.min = tomorrowFormat;



//BUG POSSIBLE : éviter que le user puisse repartir avant la date de début avec la date de fin :


//1. Dire à l'input end_date qu'il doit se mettre 1 jour plus tard que la date sélectionnée dans l'input start_date :

//Les évènements autorisés sur les inputs sont "input" et "change"
//"e" : Récupérer l'évènement (donc ici la date tapée dans l'input)
start_date.addEventListener("change", (e) => {
    //Récupérer l'event (e) dans une variable (ce qui est tapé dans l'input = e.target.value) :
    let day = new Date(e.target.value);

    //Mettre une structure de contrôle :
    if (end_date.value < start_date.value) {
        //Ajouter +1 jour à la start_date :
        day.setDate(day.getDate() + 1);
        //Passer la nouvelle valeur de day (J+1 grâce au setDate) à l'input end_date ET au bon format (grâce à la formule) :
        end_date.value = day.toISOString().split("T")[0];
    }
});


//2. Eviter que l'utilisateur ne reparte dans le passé avec la date de fin :

//Quand le user sélectionne une end_date qui tombe avant la start-date, la start_date repartira au jour précédent la end_date sélectionnée :

end_date.addEventListener("change", (e) =>{
     //Récupérer l'event (e) dans une variable (ce qui est tapé dans l'input = e.target.value) :
    let day = new Date(e.target.value);

    //Mettre une structure de contrôle pour éviter les bugs :
    if (end_date.value < start_date.value) {
        //Prendre la date du jour précédent :
        day.setDate(day.getDate() - 1);
       //Injecter la formule à "day" pour obtenir le bon format et donner sa valeur à start_date :
        start_date.value = day.toISOString().split("T")[0];
    }

})



//ADD PRICES OF NIGHTS :

//Création d'une fonction pour le calcul du prix de la réservation :
const bookingCalc = () => {
    //Calculer le "temps de différence" (nombre de nuits) (va produire un Timestamp donc un chiffre en millisecondes):
    //Math.abs : la valeur absolue
    //new Date (end_date) : pour avoir le bon format et faire le bon calcul
    let diffTime = Math.abs(new Date(end_date.value) - new Date(start_date.value));
    
    //Convertir le chiffre en millisecondes obtenu en jours :
    //Math.ceil : arrondir au supérieur (toujours pour les dates)
    // "1000" : pour avoir les secondes
    // "* 60" : minutes
    // "* 60" : heures
    // "* 24" : jours
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //Calcul :
    //Toujours mettre un .textContent quand on veut passer quelque chose à une balise HTML 
    //diffDays = nombre de jours
    // * ce qui est contenu dans nightPrice
    total.textContent = diffDays * nightPrice.textContent;
};

//JOUER la fonction à chaque fois qu'on touche aux inputs :
start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);

//Jouer la fonction au lancement de la page :
bookingCalc();