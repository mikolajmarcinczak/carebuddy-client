
<template>
    <header :class="{ 'scrolled-nav' : scrollNav }">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <nav> 
            <div class="branding">
                <router-link to="/" style="color: #fff"><img src="/src/assets/logo.jpg" alt="Logo CareBuddy"></router-link>
            </div>
           <ul v-show="!mobile" class="navigation">
            <li><router-link to="/profile" style="color: #fff"> Konto </router-link></li>
            <li><router-link to="/proteges" style="color: #fff"> Podopieczni </router-link></li>
            <li><router-link to="/caregivers" style="color: #fff"> Opiekunowie </router-link></li>
            <li><a style="color: #fff"> Ustawienia </a></li>
            <li><router-link :to="loggedIn ? '/logout' : '/login'" style="color: #fff"> {{ loggedIn ? 'Wyloguj' : 'Zaloguj'}} </router-link></li>
           </ul>
           <div class="icon">
            <i @click="toggleMobileNav" v-show="mobile" class="fa fa-bars" :class="{'icon-active' :mobileNav}"></i>
           </div>

           <transition name="mobile-nav"> 
            <ul v-show="mobileNav" class="dropdown-nav">
                <li><router-link to="/profile" style="color: #000"> Konto </router-link></li>
                <li><router-link to="/proteges" style="color: #000"> Podopieczni </router-link></li>
								<li><router-link to="/caregivers" style="color: #000"> Opiekunowie </router-link></li>
                <li><router-link to="/settings" style="color: #000"> Ustawienia </router-link></li>
                <li><router-link :to="loggedIn ? '/logout' : '/login'" style="color: #000">  {{ loggedIn ? 'Wyloguj' : 'Zaloguj'}}  </router-link></li>
           </ul>
           </transition>
        </nav>
    </header>  
</template>

<script lang="ts">
import {useAuthStore} from "@/stores/auth.module";

export default {
	name: "navigation-menu",
	data() {
		return {
			scrollNav: false,
			mobile: false,
			mobileNav: false,
			authStore: {},
			windowWidth: 0,
		};

	},
	created() {
		window.addEventListener("resize", this.checkScreen);
		this.checkScreen();
	},
	mounted() {
		window.addEventListener("scroll", this.updateScroll);
	},
	computed: {
		loggedIn() {
			return useAuthStore().status.loggedIn;
		}
	},
	methods: {
		toggleMobileNav() {
			this.mobileNav = !this.mobileNav;
		},
		updateScroll() {
			const scrollPosition = window.scrollY;
			if (scrollPosition > 50) {
				this.scrollNav = true;
			}
			this.scrollNav = false;
		},
		checkScreen() {
			this.windowWidth = window.innerWidth;
			if (this.windowWidth <= 750) {
				this.mobile = true;
				return;
			}
			this.mobile = false;
			this.mobileNav = false;
			return;

		},
	},
};
</script>

<style lang="scss" scoped>

header {
    background: linear-gradient(to top left, #5ebe79 17%, #3599a7 63%);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: .5s ease all;
    color: #020202;
    top: 0;
    left: 0;
    


    nav {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: row;
        padding: 12px 0;
        transition: .5s ease all;
        width: 90%;
        margin: 0 auto;
        @media (min-width: 1140px){
            max-width: 1140px;
        }

        ul,
        .link{
            font-weight: 500;
            color: #fff;
            list-style: none;
            text-decoration: none;
        }

        li {
            text-transform: uppercase;
            padding: 16px;
            margin-left: 16px;
            
        }

        .link{
            font-size: 16px;
            transition: .5s ease all;
            padding-bottom: 4px;
            border-bottom: 1px solid transparent;

            & :hover {
                color: rgb(0, 0, 0);
                border-color: rgb(0, 0, 0);
            }
        }

        .branding {
            display: flex;
            align-items: center;

            img {
                width: 50px;
                transition: .5s ease all;
            }
        }
        .navigation {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: flex-end;
        }
        .icon {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 24px;
            height: 100%;

            i {
                cursor: pointer;
                font-size: 24px;
                transition: .8s ease all
            }
        }
        .icon-active {
            transform: rotate(180deg);
        }
        .dropdown-nav {
            display: flex;
            flex-direction: column;
            position: fixed;
            width: 100%;
            max-width: 250px;
            height: 100%;
            background-color: #fff;
            top: 0;
            left: 0;

            li {
                margin-left: 0;
                .link {
                    color: #000;
                }
            }
        }

        .mobile-nav-enter-active,
        .mobile-nav-leave-active {
            transition: 1s ease all;
        }

        .mobile-nav-enter-from,
        .mobile-nav-leave-to {
            transform: translateX(-250px);
        }

        .mobile-nav-enter-to {
            transform: translateX(0);
        }
    }
}

.scrolled-nav {
    background-color: #000;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);

    nav {
        padding: 8px 0;

        .branding {
            img {
                width: 40px;
                box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);;
            }
        }
    }
}
</style>