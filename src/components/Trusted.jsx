import React from 'react';

const Trusted = () => {
    return (
        <section className="py-6 dark:bg-gray-800 dark:text-gray-100">
	<div className="container p-4 mx-auto space-y-16 sm:p-10">
    <h1 className="md:text-4xl text-xl text-center font-bold text-[#112D57] mb-14 font-[poppins] ">
        Trusted Vendors
      </h1>
		<div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?0" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Vector Shoes</h4>
					<p className="text-sm dark:text-gray-400">176 peoples like this</p>
				</div>
			</div>
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?1" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Fashion Mafia</h4>
					<p className="text-sm dark:text-gray-400">2k people like this</p>
				</div>
			</div>
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?2" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Coolrez</h4>
					<p className="text-sm dark:text-gray-400">250 people like this</p>
				</div>
			</div>
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?3" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Wrist Maker</h4>
					<p className="text-sm dark:text-gray-400">399 people like this</p>
				</div>
			</div>
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?4" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Amaze furniture</h4>
				</div>
			</div>
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?5" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Lightning</h4>
				</div>
			</div>
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?6" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Sweet essientials</h4>
				</div>
			</div>
			<div className="">
				<img alt="" className="object-cover h-44 w-[66%] mx-auto mb-4 bg-center rounded-sm dark:bg-gray-500" src="https://source.unsplash.com/240x320/?portrait?7" />
				<div className="flex flex-col items-center">
					<h4 className="text-xl font-semibold">Make over</h4>
				</div>
			</div>
		</div>
	</div>
</section>
    );
};

export default Trusted;