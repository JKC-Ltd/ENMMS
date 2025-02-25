<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>

    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
                Hi, {{ Auth::user()->firstname; }}
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <form method="POST" action="{{ route('logout') }}">
                @csrf    
                    <a class="dropdown-item" href="route('logout')"
                        onclick="event.preventDefault();
                                this.closest('form').submit();">
                        <p>Logout</p>
                    </a>          
                </form>
            </div>
        </li>
    </ul>
</nav>
