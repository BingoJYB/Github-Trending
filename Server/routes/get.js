let express = require('express');
let request = require('request');
let cheerio = require('cheerio');
let router = express.Router();

router.get('/', (req, res, next) => {
    let projects = [];
    let base_url = 'https://github.com';
    let url = 'https://github.com/trending';

    request(url, (error, response, html) => {
        if (!error) {
            let promises = [];
            let $ = cheerio.load(html);

            $('h3 a').each((i, element) => {
                let project = {'name': '', 'watcher': '0', 'star': '0'};
                let project_name = $(element).attr('href');
                project['name'] = project_name;

                let promise = new Promise((resolve, reject) => {
                    request(base_url + project_name, (error, response, html) => {
                        if (!error) {
                            let $ = cheerio.load(html);

                            $('.social-count').each((i, element) => {
                                if (i === 0) {
                                    project['watcher'] = $(element).text().trim();
                                }
                                else if (i === 1) {
                                    project['star'] = $(element).text().trim();
                                }
                            });

                            projects.push(project);
                            resolve();
                        }
                    });
                });

                promises.push(promise);
            });

            Promise.all(promises).then(() => res.send(projects));
        }
    });
});

module.exports = router;
