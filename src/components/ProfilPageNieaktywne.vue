<template>
    <div class="container mx-auto w-full">
        <!-- Code block starts -->

        <div class="w-full bg-white dark:bg-gray-800 py-3 flex flex-col xl:flex-row items-start xl:items-center justify-between px-5 xl:px-10 shadow rounded-t bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl">

            <div class="lg:hidden w-full relative mt-2 md:mt-4">
                <div class="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-selector" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#a0aec0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="8 9 12 5 16 9" />
                        <polyline points="16 15 12 19 8 15" />
                    </svg>
                </div>
                <select aria-label="Selected tab" class="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 dark:text-gray-100 appearance-none bg-transparent relative z-10">
                    <option class="text-sm text-gray-600 dark:text-gray-100">Inactive</option>
                    <option class="text-sm text-gray-600 dark:text-gray-100">Inactive</option>
                    <option class="text-sm text-gray-600 dark:text-gray-100">Active</option> <!--selected=""-->
                    <option class="text-sm text-gray-600 dark:text-gray-100">Inactive</option>
                    <option class="text-sm text-gray-600 dark:text-gray-100">Inactive</option>
                </select>
            </div>
            <ul class="hidden lg:flex items-center lg:mt-6 xl:mt-0">
                
                <li class="cursor-pointer font-normal flex justify-center items-center py-2 px-4 rounded mr-4 sm:mr-0 md:mr-0 lg:mr-0 xl:mr-0 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">Notatki</li>
                
                <li class="cursor-pointer font-normal flex justify-center items-center py-2 px-4 rounded mr-4 sm:mr-0 md:mr-0 lg:mr-0 xl:mr-0 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">Kalendarz</li>
                <li class="cursor-pointer font-normal flex justify-center items-center py-2 px-4 rounded mr-4 sm:mr-0 md:mr-0 lg:mr-0 xl:mr-0 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">Dodaj podopiecznego</li>
                <li class="cursor-pointer font-normal flex justify-center items-center py-2 px-4 rounded mr-4 sm:mr-0 md:mr-0 lg:mr-0 xl:mr-0 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">Edytuj profil</li>
                <li class="cursor-pointer font-normal flex justify-center items-center py-2 px-4 rounded mr-4 sm:mr-0 md:mr-0 lg:mr-0 xl:mr-0 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">Zmień hasło</li>
            </ul>
        </div>

        <!-- Code block ends -->
    </div>

        <div class="container mx-auto w-full py-5 justify-center">
            <div>
                <div class="h-full w-full flex flex-col justify-between justify-items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                    <div tabindex="0" class="focus:outline-none h-24 w-24 mb-4 lg:mb-0 mr-4 my-5"> 
                        <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_6.png" alt="man avatar" class="h-full w-full rounded-full overflow-hidden shadow" />
                    </div>
                    <div class="my-5 flex justify-center items-center">
                        <h4 tabindex="0" class="text-gray-800 dark:text-gray-100 font-bold mb-3">Julia Niezgódka</h4>
                        <p tabindex="0" class="focus:outline-none text-gray-800 dark:text-gray-100 text-xl">Opiekun</p>
                    </div>
                    <div class="flex justify-center items-center"> 

                    <div class="justify-center">
                        <p> Wiek: 24 </p>
                        <p> Miejscowość: Warszawa </p>
                        <p> Podopieczni </p>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                            into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                            passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
                    </div>
                        
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center"> 
                <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Zapisz zmiany</button>
            </div>
        </div>
</template>

<script>
export default {
    name: "GreyTabsOnRight",
};
</script>