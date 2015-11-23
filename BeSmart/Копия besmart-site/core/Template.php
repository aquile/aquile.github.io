<?php

/**
 * Description of Template
 *
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
class Template {
    private $info = array();
    private $tpl_folder = '/templates/';

    public function __construct($page_info) {
        $this->info = $page_info;
        $tpl_folder = explode('/', $this->info['templ_path_name']);
        $this->tpl_folder .= $tpl_folder[0];
        $this->renderPage();
    }
    
    public function renderPage(){
         include ('templates/' . $this->info['templ_path_name']);
    }
    
    private function renderPageContent(){
        // Get dynamic content from DB
//        if ($this->info['content_on_disc'] == '0') {
//            echo $this->info['content'];
//        } else {
            if (file_exists('pages/' . $this->info['name'] . '.php')) {
                include 'pages/' . $this->info['name'] . '.php';
            } else {
                echo $this->info['content'];
            }
//        }
    }
}
?>
