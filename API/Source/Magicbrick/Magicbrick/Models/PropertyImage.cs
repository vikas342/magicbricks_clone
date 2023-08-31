using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class PropertyImage
    {
        public int ImgId { get; set; }
        public int? PropertyId { get; set; }
        public string ImageUrl { get; set; } = null!;
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifedBy { get; set; }

        public virtual Property? Property { get; set; }
    }
}
