/**
 * Created by Oriol on 15/4/16.
 */
// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute', 'angular-clipboard']);
var secrets = ('secrets.js');

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainController'
        })
        .when('/secret', {
            templateUrl : 'views/secret.html',
            controller  : 'secretController'
        })
        .when('/combine', {
            templateUrl : 'views/combine.html',
            controller  : 'combineController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message =  'Smart Cities II - Shamir Secret Sharing';
});

angularRoutingApp.controller('secretController', function($scope, $http) {
    $scope.message = 'Formulario para añadir clave compartida';
    $scope.newStudent = {};
    $scope.students = {};
    $scope.selected = false;

    //////////Parte SSS

    $scope.secreto = '';
    $scope.secretoHex = '';
    $scope.n = ''; //nº shares
    $scope.t = ''; //threshold
    $scope.shares = '';
    $scope.share = '';

    $scope.registrar = function () {

        /**
         * Created by Oriol on 10/4/16.
         */
        console.log('\nSecreto Compartido - Shamir\n');

        //var secreto = 'supersecerto';
// Convierte el texto del secreto a hexadecimal
        $scope.secretoHex = secrets.str2hex($scope.secreto); // => 240-bit
// Genera secreto aleatorio de 512-bit en hexadecimal
//var secreto = secrets.random(1024);
        var n = parseInt($scope.n);
        var t = parseInt($scope.t);
        var i = 0;
        console.log('-Secreto:', $scope.secreto);
        console.log('-Secreto en hexa:', $scope.secretoHex);
        console.log('-Número de shares:', $scope.n);
        console.log('-Umbral de cooperación:', $scope.t);

// Divide el secreto en "n" shares, con un umbral de "t" shares para descifrarlo, añadiendo zero-padding si los shares no llegan a 1024 bits
        $scope.shares = secrets.share($scope.secretoHex, n, t, 1024); // => 1024-bit shares
//Muestra por consola  todos los shares
        while (i < $scope.n) {
            console.log('Share', i, ':', $scope.shares[i]);
            i++;
        }
// Combina los shares (mínimo de "t" para conseguir descifrar el secreto)
//var comb = secrets.combine( [ shares[1], shares[3], shares[7], shares[0] ] );
// Combina toods los shares
//var comb = secrets.combine( shares );
// Combina "x" shares seguidos
        //var comb = secrets.combine($scope.shares.slice(2, 6));

// Convierte de nuevo a UTF
        //comb = secrets.hex2str(comb);

        //console.log('\nCombinación de los shares:', comb);
        //console.log('Descifrado correctamente:', comb === $scope.secreto); // => true / false


    };

    $scope.supported = false;

    $scope.textToCopy = 'I can copy by clicking!';

    $scope.success = function () {
        console.log('Copiado en portapapeles!');
    };

    $scope.fail = function (err) {
        console.error('Error al copiar en portapapeles!', err);
    };
    //////////Fin parte SSS



//    // Obtenemos todos los estudiantes
//    $http.get('/api/student').success(function(data) {
//            $scope.students = data;
//        })
//        .error(function(data) {
//            console.log('Error: ' + data);
//        });
//
//
//    // Función para registrar estudiante
//    $scope.registrarPersona = function() {
//        $http.post('/api/student', $scope.newStudent)
//            .success(function(data) {
//                $scope.newStudent = {}; // Borramos los datos del formulario
//                $scope.students = data;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para eliminar estudiante
//    $scope.deleteStudent = function(id) {
//        $http.delete('/api/student/' + id)
//            .success(function(data) {
//                $scope.newStudent = {};
//                $scope.students = data;
//                $scope.selected = false;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para editar los datos de una persona
//    $scope.modificarPersona = function(newPersona) {
//        $http.put('/api/persona/' + $scope.newPersona._id, $scope.newPersona)
//            .success(function(data) {
//                $scope.newPersona = {}; // Borramos los datos del formulario
//                $scope.personas = data;
//                $scope.selected = false;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//});
//
//angularRoutingApp.controller('subjectController', function($scope, $http) {
//    $scope.message = 'Clicar sobre el nombre de una asignatura y/o alumno para ver los detalles';
//    $scope.newSubject = {};
//    $scope.selectedSubject = {};
//    $scope.selectedStudent = {};
//    $scope.subjects = {};
//    $scope.students = {};
//    $scope.selected = false;
//    $scope.table1 = false;
//    $scope.table2 = false;
//
//    // Obtenemos todos los datos de la base de datos
//    $http.get('/api/subject').success(function(data) {
//            $scope.subjects = data;
//            console.log($scope.subjects);
//        })
//        .error(function(data) {
//            console.log('Error: ' + data);
//        });
//
//    // Función para añadir asignatura
//    $scope.addSubject = function() {
//        $http.post('/api/subject', $scope.newSubject)
//            .success(function(data) {
//                $scope.newSubject = {}; // Borramos los datos del formulario
//                $scope.subjects = data;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para eliminar asignatura
//    $scope.deleteSubject = function(id) {
//        $http.delete('/api/subject/' + id)
//            .success(function(data) {
//                $scope.newSubject = {};
//                $scope.subjects = data;
//                $scope.selected = false;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para añadir alumno a asignatura
//    $scope.addStudent = function() {
//        console.log($scope.selectedSubject._id);
//        console.log($scope.newStudent);
//        $http.post('/api/subject/' + $scope.selectedSubject._id, $scope.newStudent)
//            .success(function(data) {
//                $scope.selectedSubject = data;
//                location.reload();
//
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para coger el Subject seleccionado en la tabla
//    $scope.selectSubject = function(subject) {
//        $scope.table1 = true;
//        $scope.selectedSubject = subject;
//        $scope.selected = true;
//        console.log($scope.selectedSubject);
//    };
//
//    // Función para coger el Student seleccionado en la tabla
//    $scope.selectStudent = function(students) {
//        $scope.table2 = true;
//        $scope.selectedStudent = students;
//        $scope.selected = true;
//        console.log($scope.selectedStudent);
//
//        $http.get('/api/student/' + $scope.selectedStudent)
//            .success(function(data) {
//                $scope.students = data;
//                console.log($scope.students);
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//
//
//    };
});

angularRoutingApp.controller('combineController', function($scope, $http) {
    $scope.message = 'Formulario para añadir los "shares"';
    //////////Parte SSS
    $scope.comb = '';
    $scope.secreto = '';
    $scope.secretoHex = '';
    $scope.n = ''; //nº shares
    $scope.t = ''; //threshold
    $scope.shares = [];
    $scope.share = '';
    $scope.s0 = '';
    $scope.s1 = '';
    $scope.s2 = '';

    $scope.addShare = function () {
        console.log($scope.share);
        $scope.shares.push($scope.share);
        console.log($scope.shares);
        $scope.share = "";
    };


    $scope.combine = function () {

        /**
         * Created by Oriol on 10/4/16.
         */
        console.log('\n Recuperar Secreto Compartido - Shamir\n');

// Combina los shares (mínimo de "t" para conseguir descifrar el secreto)
        //$scope.comb = secrets.combine( [ $scope.s0, $scope.s1, $scope.s2 ] );
// Combina toods los shares
        $scope.comb = secrets.combine( $scope.shares );
// Combina "x" shares seguidos
        //var comb = secrets.combine($scope.shares.slice(2, 6));

// Convierte de nuevo a UTF
        $scope.comb = secrets.hex2str($scope.comb);

        console.log('\nCombinación de los shares:', $scope.comb);
        console.log('Descifrado correctamente:', $scope.comb === $scope.secreto); // => true / false


    };

    $scope.supported = false;

    $scope.textToCopy = 'I can copy by clicking!';

    $scope.success = function () {
        console.log('Copiado en portapapeles!');
    };

    $scope.fail = function (err) {
        console.error('Error al copiar en portapapeles!', err);
    };
    //////////Fin parte SSS



//    // Obtenemos todos los estudiantes
//    $http.get('/api/student').success(function(data) {
//            $scope.students = data;
//        })
//        .error(function(data) {
//            console.log('Error: ' + data);
//        });
//
//
//    // Función para registrar estudiante
//    $scope.registrarPersona = function() {
//        $http.post('/api/student', $scope.newStudent)
//            .success(function(data) {
//                $scope.newStudent = {}; // Borramos los datos del formulario
//                $scope.students = data;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para eliminar estudiante
//    $scope.deleteStudent = function(id) {
//        $http.delete('/api/student/' + id)
//            .success(function(data) {
//                $scope.newStudent = {};
//                $scope.students = data;
//                $scope.selected = false;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para editar los datos de una persona
//    $scope.modificarPersona = function(newPersona) {
//        $http.put('/api/persona/' + $scope.newPersona._id, $scope.newPersona)
//            .success(function(data) {
//                $scope.newPersona = {}; // Borramos los datos del formulario
//                $scope.personas = data;
//                $scope.selected = false;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//});
//
//angularRoutingApp.controller('subjectController', function($scope, $http) {
//    $scope.message = 'Clicar sobre el nombre de una asignatura y/o alumno para ver los detalles';
//    $scope.newSubject = {};
//    $scope.selectedSubject = {};
//    $scope.selectedStudent = {};
//    $scope.subjects = {};
//    $scope.students = {};
//    $scope.selected = false;
//    $scope.table1 = false;
//    $scope.table2 = false;
//
//    // Obtenemos todos los datos de la base de datos
//    $http.get('/api/subject').success(function(data) {
//            $scope.subjects = data;
//            console.log($scope.subjects);
//        })
//        .error(function(data) {
//            console.log('Error: ' + data);
//        });
//
//    // Función para añadir asignatura
//    $scope.addSubject = function() {
//        $http.post('/api/subject', $scope.newSubject)
//            .success(function(data) {
//                $scope.newSubject = {}; // Borramos los datos del formulario
//                $scope.subjects = data;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para eliminar asignatura
//    $scope.deleteSubject = function(id) {
//        $http.delete('/api/subject/' + id)
//            .success(function(data) {
//                $scope.newSubject = {};
//                $scope.subjects = data;
//                $scope.selected = false;
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para añadir alumno a asignatura
//    $scope.addStudent = function() {
//        console.log($scope.selectedSubject._id);
//        console.log($scope.newStudent);
//        $http.post('/api/subject/' + $scope.selectedSubject._id, $scope.newStudent)
//            .success(function(data) {
//                $scope.selectedSubject = data;
//                location.reload();
//
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // Función para coger el Subject seleccionado en la tabla
//    $scope.selectSubject = function(subject) {
//        $scope.table1 = true;
//        $scope.selectedSubject = subject;
//        $scope.selected = true;
//        console.log($scope.selectedSubject);
//    };
//
//    // Función para coger el Student seleccionado en la tabla
//    $scope.selectStudent = function(students) {
//        $scope.table2 = true;
//        $scope.selectedStudent = students;
//        $scope.selected = true;
//        console.log($scope.selectedStudent);
//
//        $http.get('/api/student/' + $scope.selectedStudent)
//            .success(function(data) {
//                $scope.students = data;
//                console.log($scope.students);
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//
//
//    };
});