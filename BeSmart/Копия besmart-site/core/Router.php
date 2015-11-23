<?php

# @autor Viktor Protsenko <pro.victorr@gmail.com>

class Router {

    public $full_path = '';
    public $page = '';
    public $subpage = '';
    public $params = array();

    public function __construct() {
        // Initialize DB
        DBmanager::init();

        // Try to authorize user
        User::init();

        // Get path
        $this->parseRoute();
        

        // render page
        $this->renderPage();
    }

    private function parseRoute() {
        $this->page = ($_GET['page'] != null ? $_GET['page'] : '');
        $this->subpage = ($_GET['subpage'] != null ? $_GET['subpage'] : '');
        $this->params = ($_GET['param'] != null ? explode("/", $_GET['param']) : array());
        
        // Generate full path
        if ($this->page == 'news' || $this->page == 'teachers' || $this->page == 'otzyvy') {
            $this->full_path = $this->page;
        } else if ($this->page == 'schedule') {
            $this->full_path = $this->page . ($_GET['subpage'] != null ? '/' . $_GET['subpage'] : '');
        } else {
            $this->full_path = ($_GET['page'] != null) ? ( $_GET['page'] . ($_GET['subpage'] != null ? ('/' . $_GET['subpage'] . ($_GET['param'] != null ? ('/' . $_GET['param']) : '')) : '')) : '';
        }
    }

    
    private function renderPage() {
        // Get page info
        $pages = DBmanager::getPageInfo($this->full_path);
        $page_info = $pages[0];
        
        if ($page_info['userTypeID'] > 0) {
            // If access to page rerquires authorization
            if (User::$authorized) {
                if (User::$userInfo['userTypeID'] >= $page_info['userTypeID']) {
                    // Run template with page info
                    new Template($page_info);
                } else {
                    header('Location: /');
                }
            } else {
                // User not authorized - go to login page (HTTP redirect to /login)
                header('Location: /');
            }
        } else {
            new Template($page_info);
        }
    }

}

?>