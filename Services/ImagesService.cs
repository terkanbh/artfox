namespace Services;

using Database;
using Database.Models;
using Services.DTOs.Images;
using Microsoft.EntityFrameworkCore;
using Requests.Images;
using Microsoft.AspNetCore.Http;

public class ImagesService
{
    private readonly Context _context;

    public ImagesService(Context context)
    {
        _context = context;
    }

    public async Task<ImageDTO[]> GetAsync(string artworkId)
    {
        var artwork = await _context.Artworks
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == artworkId)
            ?? throw new Exception("Artwork not found.");

        var imagesDTO = artwork.Images.Select(x => MapToImageDTO(x));

        return [.. imagesDTO];
    }

    public async Task<ImageDTO> GetMainAsync(string artworkId)
    {
        var artwork = await _context.Artworks
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == artworkId);

        if (artwork == null)
        {
            throw new Exception("Artwork not found.");
        }

        var mainImage = artwork.Images.FirstOrDefault(x => x.DisplayOrder == 0);

        if (mainImage == null)
        {
            throw new Exception("Artwork don't have images.");
        }
        
        return MapToImageDTO(mainImage);
    }

    /// <summary> Updates artwork images according to the recieved image list </summary>
    /// <returns> A collection of the updated artwork images </returns>
    /// <exception cref="ArgumentNullException"> Throws exception w/ message "Artwork not found." </exception>
    public async Task<ImageDTO[]> UpdateAsync(string artworkId, List<UpdateImageRequest> images)
    {
        var artwork = await _context.Artworks
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == artworkId)
            ?? throw new ArgumentNullException("Artwork not found.");

        // Order image list
        images = [..images.OrderBy(x => x.DisplayOrder)];
        for (var i = 0; i < images.Count; i++)
            images[i].DisplayOrder = i;

        // Delete non-existing images
        artwork.Images.RemoveAll(x => !images.Any(y => y.Id == x.Id));

        foreach (var image in images)
        {
            // Update display order of existing images
            var imageUpdate = artwork.Images.FirstOrDefault(x => x.Id == image.Id);
            if (imageUpdate is not null)
            {
                imageUpdate.DisplayOrder = image.DisplayOrder;
                continue;
            }

            if (image.ImageFile is null) continue;

            // Create non existing images
            artwork.Images.Add(new ArtworkImage
            {
                Id = Guid.NewGuid().ToString(),
                ArtworkId = artworkId,
                ImageData = await ConvertToByteArrayAsync(image.ImageFile),
                DisplayOrder = image.DisplayOrder
            });
        }

        // Save changes
        await _context.SaveChangesAsync();

        return await GetAsync(artworkId);
    }

    private ImageDTO MapToImageDTO(ArtworkImage image)
    {
        return new ImageDTO
        {
            ImageId = image.Id,
            ArtworkId = image.ArtworkId,
            ImageData = image.ImageData,
            DisplayOrder = image.DisplayOrder
        };
    }

    private static async Task<byte[]> ConvertToByteArrayAsync(IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }
}