<script>
    import { base } from '$app/paths';
</script>

<header class="bg-blue-500 text-white p-4">

            <nav>
                <ul>
                  <li><a href="{base}/">Home</a></li>
                  <li><a href="{base}/about">About</a></li>
                  <li><a href="{base}/projects">Projects</a></li>
                  <!-- <li><a href="{base}/blog" class="dropdown-toggle">Blog</a></li> -->
                  <li><a href="https://www.linkedin.com/in/charles-comey-336297326/">LinkedIn</a></li>
                  <li><a href="https://github.com/cdcomey">GitHub</a></li>
                  <!-- <li><a href="{base}/contact">Contact</a></li> -->
                  <!-- <li><a href="">Futura Font Check</a></li> -->
                </ul>
              </nav>

</header>

<style>

header {
    background-color: #0f111296;
    /* background-image: url(windy_hill_forest_1.jpg); */
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    color: #fff;
    padding: 0 5vw;
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    z-index: 100;
    font-family: 'Courier', 'Inconsolata', 'Courier', system-ui;
}
/* 
header h1 {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  } */

/* main section:first-child {
    margin-top: 10%;
} */

nav ul {
    z-index: 1;
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin-right: 3%;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
}

a:hover {
  text-decoration: underline;
  /* font-family: sans-serif; */
}
</style>

