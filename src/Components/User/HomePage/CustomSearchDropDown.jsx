import { useState, useRef, useEffect } from 'react';
import { SearchIcon, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomSearchDropdown = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const navigate = useNavigate()

    const options = [
        { value: '/career', label: 'Company Careers', icon: '🏢' },
        { value: '/youtube', label: 'Youtube Learning', icon: '📺' },
        { value: '/insitute', label: 'Coaching Centers', icon: '🎓' },
        { value: '/certificate', label: 'Free Certifications', icon: '📜' }
    ];

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    const navigateFunction = (value = searchValue) => {
        if (!value) return;
        console.log('Navigating to:', value);
        navigate(value);
        setIsOpen(false);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option.label);
        setSearchValue(option.value);
        setIsOpen(false);
        navigateFunction(option.value);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        setSelectedOption('');
        setIsOpen(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (filteredOptions.length > 0 && !selectedOption) {
                handleOptionSelect(filteredOptions[0]);
            } else {
                navigateFunction();
            }
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative min-w-[350px]" ref={dropdownRef}>
            <div className='flex bg-white justify-between items-center py-2 gap-4 rounded-lg shadow-sm border border-gray-200 hover:border-[#244ad1] transition-colors duration-200'>
                <div className='flex-1 px-3'>
                    <input
                        ref={inputRef}
                        type="text"
                        className='outline-none w-full placeholder-gray-400 text-gray-700'
                        placeholder={selectedOption || "Search for Company Careers"}
                        value={searchValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        onFocus={() => setIsOpen(true)}
                    />
                </div>
                
                <div className='flex items-center gap-2 px-2'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='p-1 hover:bg-gray-100 rounded transition-colors duration-150'
                    >
                        <ChevronDown 
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                            }`} 
                        />
                    </button>
                    
                    <button
                        onClick={() => navigateFunction()}
                        className='p-2 hover:bg-blue-50 rounded-lg transition-colors duration-150'
                    >
                        <SearchIcon 
                            strokeWidth={2.5} 
                            className='text-[#244ad1] w-5 h-5' 
                        />
                    </button>
                </div>
            </div>

            {/* Custom Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredOptions.length > 0 ? (
                        <>
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                                        index === 0 ? 'rounded-t-lg' : ''
                                    } ${
                                        index === filteredOptions.length - 1 ? 'rounded-b-lg' : ''
                                    } hover:bg-blue-50 hover:text-[#244ad1]`}
                                >
                                    <span className="text-lg">{option.icon}</span>
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">{option.label}</div>
                                        {/* <div className="text-xs text-gray-500">{option.value}</div> */}
                                    </div>
                                </div>
                            ))}
                            {searchValue && !options.some(opt => opt.value === searchValue) && (
                                <>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <div
                                        onClick={() => navigateFunction()}
                                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <SearchIcon className="w-4 h-4 text-gray-400" />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-gray-700">
                                                Search for "{searchValue}"
                                            </div>
                                            <div className="text-xs text-gray-500">Custom search</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="px-4 py-3 text-gray-500 text-sm text-center">
                            No matching categories found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomSearchDropdown;