module.exports = function(grunt) {

    // 1. CONFIG
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            options: {
                reporter: require("jshint-stylish"),

                globals: {
                    console:    true,
                    $:          true,
                    jQuery:     true,
                }
            },

            target: ["src/squishy.js"]
        },

        uglify: {
            build: {
                src: "src/squishy.js",
                dest: "dist/squishy.min.js"
            }
        },

        shell: {
            copyMain: {
                command: 'cp src/squishy.js dist/squishy.js'
            }
        },

        watch: {
            options: { livereload: false },

            js: {
                files: ["src/bigfoot.js"],
                tasks: ["uglify", "jshint", "shell:copyMain"],
                options: { spawn: false }
            }
        }
    });

    // 2. TASKS
    require("load-grunt-tasks")(grunt);

    // 3. PERFORM
    grunt.registerTask("default", ["jshint", "uglify", "shell"]);

}